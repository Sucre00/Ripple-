package main

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"log"
	"math"
	"math/rand"
	"net/http"
	"os"
	"path/filepath"
	"sync"
	"time"

	"backend/prisma/db"

	"golang.org/x/crypto/bcrypt"
)

var client *db.PrismaClient

func main() {
	// Initialize Prisma Client
	client = db.NewClient()
	if err := client.Connect(); err != nil {
		log.Fatalf("failed to connect to database: %v", err)
	}
	defer func() {
		if err := client.Disconnect(); err != nil {
			log.Printf("failed to disconnect database: %v", err)
		}
	}()

	mux := http.NewServeMux()

	// Auth Endpoints
	mux.HandleFunc("POST /api/auth/login", loginHandler)
	mux.HandleFunc("POST /api/auth/register", registerHandler)
	mux.HandleFunc("POST /api/auth/otp/send", sendOtpHandler)
	mux.HandleFunc("POST /api/auth/otp/verify", verifyOtpHandler)
	mux.HandleFunc("POST /api/auth/appeal", appealHandler)
	mux.HandleFunc("POST /api/referral/click", referralClickHandler)
	mux.HandleFunc("GET /api/affiliate/dashboard", affiliateDashboardHandler)
	mux.HandleFunc("GET /api/affiliate/marketplace", affiliateMarketplaceHandler)
	mux.HandleFunc("POST /api/affiliate/link/generate", affiliateLinkGenerateHandler)
	mux.HandleFunc("POST /api/affiliate/withdraw", affiliateWithdrawHandler)
	mux.HandleFunc("POST /api/bank/resolve", bankResolveHandler)
	mux.HandleFunc("GET /api/affiliate/leaderboard", affiliateLeaderboardHandler)
	mux.HandleFunc("GET /api/user/2fa", user2faGetHandler)
	mux.HandleFunc("POST /api/user/2fa/toggle", user2faToggleHandler)
	mux.HandleFunc("GET /api/support/tickets", supportTicketsGetHandler)
	mux.HandleFunc("POST /api/support/tickets", supportTicketsCreateHandler)
	mux.HandleFunc("GET /api/merchant/dashboard", merchantDashboardHandler)
	mux.HandleFunc("GET /api/merchant/campaigns", merchantCampaignsListHandler)
	mux.HandleFunc("POST /api/merchant/campaigns", merchantCampaignCreateHandler)
	mux.HandleFunc("GET /api/merchant/affiliates", merchantAffiliatesHandler)
	mux.HandleFunc("POST /api/merchant/affiliates/approve", merchantAffiliateApproveHandler)
	mux.HandleFunc("POST /api/merchant/affiliates/reject", merchantAffiliateRejectHandler)
	mux.HandleFunc("GET /api/merchant/payouts", merchantPayoutsHandler)
	mux.HandleFunc("POST /api/merchant/payouts/approve", merchantPayoutApproveHandler)
	mux.HandleFunc("POST /api/merchant/payouts/reject", merchantPayoutRejectHandler)
	mux.HandleFunc("POST /api/merchant/wallet/fund", merchantWalletFundHandler)
	mux.HandleFunc("GET /api/admin/overview", adminOverviewHandler)
	mux.HandleFunc("GET /api/admin/verifications", adminVerificationsHandler)
	mux.HandleFunc("POST /api/admin/verifications/business/approve", adminBusinessApproveHandler)
	mux.HandleFunc("POST /api/admin/verifications/business/reject", adminBusinessRejectHandler)
	mux.HandleFunc("POST /api/admin/verifications/kyc/approve", adminKycApproveHandler)
	mux.HandleFunc("POST /api/admin/verifications/kyc/reject", adminKycRejectHandler)
	mux.HandleFunc("GET /api/admin/businesses", adminBusinessesListHandler)
	mux.HandleFunc("POST /api/admin/businesses/plan", adminBusinessPlanUpdateHandler)
	mux.HandleFunc("GET /api/admin/affiliates", adminAffiliatesListHandler)
	mux.HandleFunc("POST /api/admin/affiliates/restrict", adminAffiliateRestrictHandler)
	mux.HandleFunc("GET /api/admin/ledger", adminLedgerHandler)
	mux.HandleFunc("GET /api/admin/config", adminConfigGetHandler)
	mux.HandleFunc("POST /api/admin/config", adminConfigUpdateHandler)

	// Onboarding Checklists Persistence
	mux.HandleFunc("GET /api/user/onboarding", userOnboardingGetHandler)
	mux.HandleFunc("POST /api/user/onboarding", userOnboardingPostHandler)

	// Webhook Configuration
	mux.HandleFunc("GET /api/merchant/webhook", merchantWebhookGetHandler)
	mux.HandleFunc("POST /api/merchant/webhook/configure", merchantWebhookConfigureHandler)

	// Pixel Conversion Tracking & Fraud Scoping Engine
	mux.HandleFunc("POST /api/pixel/conversion", pixelConversionHandler)

	// Health Check
	mux.HandleFunc("GET /api/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"status":"ok"}`))
	})

	// CORS wrapper
	corsHandler := func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
			w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
			w.Header().Set("Access-Control-Allow-Credentials", "true")
			
			if r.Method == "OPTIONS" {
				w.WriteHeader(http.StatusOK)
				return
			}
			next.ServeHTTP(w, r)
		})
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	serverAddr := ":" + port
	log.Printf("starting backend server on %s", serverAddr)
	if err := http.ListenAndServe(serverAddr, corsHandler(mux)); err != nil {
		log.Fatalf("failed to start server: %v", err)
	}
}

// Helpers for JSON responses
func writeJSONError(w http.ResponseWriter, status int, msg string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(map[string]string{"error": msg})
}

func writeJSONSuccess(w http.ResponseWriter, status int, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(data)
}

// Handler Functions

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	Role     string `json:"role"`
}

type LoginResponse struct {
	ID    string `json:"id"`
	Email string `json:"email"`
	Role  string `json:"role"`
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
	var req LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, "invalid request payload")
		return
	}

	ctx := context.Background()
	user, err := client.User.FindUnique(
		db.User.Email.Equals(req.Email),
	).Exec(ctx)

	if err != nil {
		writeJSONError(w, http.StatusUnauthorized, "invalid email or password")
		return
	}

	// Validate role matches
	if user.Role != req.Role {
		writeJSONError(w, http.StatusUnauthorized, "unauthorized role for this account")
		return
	}

	// Compare bcrypt hash
	if err := bcrypt.CompareHashAndPassword([]byte(user.PasswordHash), []byte(req.Password)); err != nil {
		writeJSONError(w, http.StatusUnauthorized, "invalid email or password")
		return
	}

	// Update last login at
	_, _ = client.User.FindUnique(
		db.User.ID.Equals(user.ID),
	).Update(
		db.User.LastLoginAt.Set(time.Now()),
	).Exec(ctx)

	writeJSONSuccess(w, http.StatusOK, LoginResponse{
		ID:    user.ID,
		Email: user.Email,
		Role:  user.Role,
	})
}

type RegisterRequest struct {
	Email        string  `json:"email"`
	Password     string  `json:"password"`
	Phone        string  `json:"phone"`
	Name         string  `json:"name"`
	Role         string  `json:"role"`
	BusinessName string  `json:"business_name,omitempty"`
	CacNumber    string  `json:"cac_number,omitempty"`
	Niche        string  `json:"niche,omitempty"`
	BankCode     string  `json:"bank_code,omitempty"`
	AccountNumber string `json:"account_number,omitempty"`
}

func registerHandler(w http.ResponseWriter, r *http.Request) {
	var req RegisterRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, "invalid request payload")
		return
	}

	// Hash password
	hashed, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "failed to process security credentials")
		return
	}

	ctx := context.Background()

	// Check if email already exists
	existing, _ := client.User.FindUnique(
		db.User.Email.Equals(req.Email),
	).Exec(ctx)
	if existing != nil {
		writeJSONError(w, http.StatusConflict, "an account with this email already exists")
		return
	}

	// Create user transaction/sequential flow
	newUser, err := client.User.CreateOne(
		db.User.Email.Set(req.Email),
		db.User.PasswordHash.Set(string(hashed)),
		db.User.Role.Set(req.Role),
		db.User.Phone.Set(req.Phone),
		db.User.Status.Set("active"),
	).Exec(ctx)

	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, fmt.Sprintf("failed to create user account: %v", err))
		return
	}

	// Post-onboarding models logic based on role
	if req.Role == "business_admin" {
		// Create Business record
		biz, err := client.Business.CreateOne(
			db.Business.User.Link(db.User.ID.Equals(newUser.ID)),
			db.Business.Name.Set(req.BusinessName),
			db.Business.CompanyRegNumber.Set(req.CacNumber),
		).Exec(ctx)

		if err != nil {
			writeJSONError(w, http.StatusInternalServerError, "user created, but failed to initialize business profile")
			return
		}

		// Create Wallet for business
		_, err = client.Wallet.CreateOne(
			db.Wallet.OwnerID.Set(biz.ID),
			db.Wallet.OwnerType.Set("business"),
			db.Wallet.Currency.Set("NGN"),
		).Exec(ctx)

		if err != nil {
			writeJSONError(w, http.StatusInternalServerError, "business initialized, but failed to create wallet ledger")
			return
		}

	} else if req.Role == "affiliate" {
		// Create Wallet for affiliate
		_, err = client.Wallet.CreateOne(
			db.Wallet.OwnerID.Set(newUser.ID),
			db.Wallet.OwnerType.Set("affiliate"),
			db.Wallet.Currency.Set("NGN"),
		).Exec(ctx)

		if err != nil {
			writeJSONError(w, http.StatusInternalServerError, "user created, but failed to create wallet ledger")
			return
		}
	}

	writeJSONSuccess(w, http.StatusCreated, LoginResponse{
		ID:    newUser.ID,
		Email: newUser.Email,
		Role:  newUser.Role,
	})
}

type OtpRequest struct {
	Phone string `json:"phone"`
}

func sendOtpHandler(w http.ResponseWriter, r *http.Request) {
	var req OtpRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, "invalid phone payload")
		return
	}

	// Mock OTP sending
	writeJSONSuccess(w, http.StatusOK, map[string]string{"message": "OTP sent successfully"})
}

type OtpVerifyRequest struct {
	Phone string `json:"phone"`
	Code  string `json:"code"`
	Role  string `json:"role"`
}

func verifyOtpHandler(w http.ResponseWriter, r *http.Request) {
	var req OtpVerifyRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, "invalid OTP verification payload")
		return
	}

	if req.Code != "1234" {
		writeJSONError(w, http.StatusUnauthorized, "invalid verification code")
		return
	}

	ctx := context.Background()
	user, err := client.User.FindUnique(
		db.User.Phone.Equals(req.Phone),
	).Exec(ctx)

	if err != nil {
		writeJSONError(w, http.StatusNotFound, "no registered account found with this phone number")
		return
	}

	if user.Role != req.Role {
		writeJSONError(w, http.StatusUnauthorized, "unauthorized role for this account")
		return
	}

	writeJSONSuccess(w, http.StatusOK, LoginResponse{
		ID:    user.ID,
		Email: user.Email,
		Role:  user.Role,
	})
}

type AppealRequest struct {
	Email  string `json:"email"`
	Reason string `json:"reason"`
}

func appealHandler(w http.ResponseWriter, r *http.Request) {
	var req AppealRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, "invalid appeal payload")
		return
	}

	// Mock appeal submission logging
	writeJSONSuccess(w, http.StatusAccepted, map[string]string{
		"message": "appeal logged successfully",
		"ticket":  "REQ-902",
	})
}

type ReferralClickRequest struct {
	Code      string `json:"code"`
	UtmSource string `json:"utm_source"`
	UtmMedium string `json:"utm_medium"`
	IP        string `json:"ip"`
}

type ReferralClickResponse struct {
	TargetURL string `json:"target_url"`
}

func referralClickHandler(w http.ResponseWriter, r *http.Request) {
	var req ReferralClickRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, "invalid request payload")
		return
	}

	ctx := context.Background()

	// 1. Find referral link by code, including its Campaign relation
	link, err := client.ReferralLink.FindUnique(
		db.ReferralLink.Code.Equals(req.Code),
	).With(
		db.ReferralLink.Campaign.Fetch(),
	).Exec(ctx)

	if err != nil {
		writeJSONError(w, http.StatusNotFound, "referral link not found")
		return
	}

	// 2. Create conversion click log
	fingerprint := fmt.Sprintf("source=%s&medium=%s", req.UtmSource, req.UtmMedium)
	_, err = client.Conversion.CreateOne(
		db.Conversion.ReferralLink.Link(db.ReferralLink.ID.Equals(link.ID)),
		db.Conversion.OrderValue.Set(0),
		db.Conversion.CommissionAmount.Set(0),
		db.Conversion.ConvertedAt.Set(time.Now()),
		db.Conversion.IPAddress.Set(req.IP),
		db.Conversion.DeviceFingerprint.Set(fingerprint),
		db.Conversion.Status.Set("clicked"),
	).Exec(ctx)

	if err != nil {
		log.Printf("failed to log conversion click: %v", err)
	}

	// 3. Increment click count
	_, _ = client.ReferralLink.FindUnique(
		db.ReferralLink.ID.Equals(link.ID),
	).Update(
		db.ReferralLink.Clicks.Increment(1),
	).Exec(ctx)

	// 4. Return target URL
	targetURL := link.Campaign().TargetURL
	writeJSONSuccess(w, http.StatusOK, ReferralClickResponse{
		TargetURL: targetURL,
	})
}

type AffiliateDashboardResponse struct {
	PendingBalance   int              `json:"pending_balance"`
	ClearingBalance  int              `json:"clearing_balance"`
	ClearedBalance   int              `json:"cleared_balance"`
	TotalEarned      int              `json:"total_earned"`
	TotalWithdrawn   int              `json:"total_withdrawn"`
	TotalClicks      int              `json:"total_clicks"`
	TotalConversions int              `json:"total_conversions"`
	Conversions      []ConversionItem `json:"conversions"`
}

type ConversionItem struct {
	ID               string    `json:"id"`
	OrderID          string    `json:"order_id"`
	CampaignName     string    `json:"campaign_name"`
	OrderValue       int       `json:"order_value"`
	CommissionAmount int       `json:"commission_amount"`
	Status           string    `json:"status"`
	ConvertedAt      time.Time `json:"converted_at"`
	IPAddress        string    `json:"ip_address"`
	UTMSource        string    `json:"utm_source"`
	UTMMedium        string    `json:"utm_medium"`
}

func affiliateDashboardHandler(w http.ResponseWriter, r *http.Request) {
	affiliateID := r.URL.Query().Get("affiliate_id")
	if affiliateID == "" {
		writeJSONError(w, http.StatusBadRequest, "missing affiliate_id parameter")
		return
	}

	ctx := context.Background()

	// 1. Fetch Wallet
	wallet, err := client.Wallet.FindFirst(
		db.Wallet.OwnerID.Equals(affiliateID),
		db.Wallet.OwnerType.Equals("affiliate"),
	).Exec(ctx)

	if err != nil {
		writeJSONError(w, http.StatusNotFound, "wallet not found for affiliate")
		return
	}

	// 2. Fetch Referral Links
	links, err := client.ReferralLink.FindMany(
		db.ReferralLink.AffiliateID.Equals(affiliateID),
	).With(
		db.ReferralLink.Campaign.Fetch(),
	).Exec(ctx)

	totalClicks := 0
	var linkIDs []string
	campaignNameMap := make(map[string]string)
	for _, link := range links {
		totalClicks += link.Clicks
		linkIDs = append(linkIDs, link.ID)
		campaignNameMap[link.ID] = link.Campaign().Name
	}

	// 3. Fetch Conversions
	var conversions []ConversionItem
	totalConversions := 0

	if len(linkIDs) > 0 {
		convs, err := client.Conversion.FindMany(
			db.Conversion.ReferralLinkID.In(linkIDs),
		).OrderBy(
			db.Conversion.ConvertedAt.Order(db.SortOrderDesc),
		).Exec(ctx)

		if err == nil {
			totalConversions = len(convs)
			for _, c := range convs {
				orderID := ""
				if val, ok := c.OrderID(); ok {
					orderID = val
				}
				ip := ""
				if val, ok := c.IPAddress(); ok {
					ip = val
				}
				utmSource := "direct"
				utmMedium := "none"
				if fp, ok := c.DeviceFingerprint(); ok {
					fmt.Sscanf(fp, "source=%s&medium=%s", &utmSource, &utmMedium)
					if len(utmSource) > 7 && utmSource[:7] == "source=" {
						utmSource = utmSource[7:]
					}
				}

				conversions = append(conversions, ConversionItem{
					ID:               c.ID,
					OrderID:          orderID,
					CampaignName:     campaignNameMap[c.ReferralLinkID],
					OrderValue:       c.OrderValue,
					CommissionAmount: c.CommissionAmount,
					Status:           c.Status,
					ConvertedAt:      c.ConvertedAt,
					IPAddress:        ip,
					UTMSource:        utmSource,
					UTMMedium:        utmMedium,
				})
			}
		}
	}

	writeJSONSuccess(w, http.StatusOK, AffiliateDashboardResponse{
		PendingBalance:   wallet.PendingBalance,
		ClearingBalance:  wallet.ClearingBalance,
		ClearedBalance:   wallet.ClearedBalance,
		TotalEarned:      wallet.TotalEarned,
		TotalWithdrawn:   wallet.TotalWithdrawn,
		TotalClicks:      totalClicks,
		TotalConversions: totalConversions,
		Conversions:      conversions,
	})
}

type MarketplaceCampaignItem struct {
	ID                    string  `json:"id"`
	Name                  string  `json:"name"`
	MerchantName          string  `json:"merchant_name"`
	CommissionType        string  `json:"commission_type"`
	CommissionValue       float64 `json:"commission_value"`
	CookieDurationDays    int     `json:"cookie_duration_days"`
	AttributionWindowDays int     `json:"attribution_window_days"`
	TargetURL             string  `json:"target_url"`
	ReferralCode          string  `json:"referral_code,omitempty"`
}

func affiliateMarketplaceHandler(w http.ResponseWriter, r *http.Request) {
	affiliateID := r.URL.Query().Get("affiliate_id")
	if affiliateID == "" {
		writeJSONError(w, http.StatusBadRequest, "missing affiliate_id parameter")
		return
	}

	ctx := context.Background()

	// 1. Fetch active campaigns
	campaigns, err := client.Campaign.FindMany(
		db.Campaign.Status.Equals("active"),
	).With(
		db.Campaign.Business.Fetch(),
	).Exec(ctx)

	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "failed to fetch campaigns")
		return
	}

	// 2. Fetch affiliate links to check if already joined
	links, err := client.ReferralLink.FindMany(
		db.ReferralLink.AffiliateID.Equals(affiliateID),
	).Exec(ctx)

	linkMap := make(map[string]string)
	if err == nil {
		for _, l := range links {
			linkMap[l.CampaignID] = l.Code
		}
	}

	var items []MarketplaceCampaignItem
	for _, c := range campaigns {
		code := linkMap[c.ID]
		items = append(items, MarketplaceCampaignItem{
			ID:                    c.ID,
			Name:                  c.Name,
			MerchantName:          c.Business().Name,
			CommissionType:        c.CommissionType,
			CommissionValue:       c.CommissionValue,
			CookieDurationDays:    c.CookieDurationDays,
			AttributionWindowDays: c.AttributionWindowDays,
			TargetURL:             c.TargetURL,
			ReferralCode:          code,
		})
	}

	writeJSONSuccess(w, http.StatusOK, items)
}

type LinkGenerateRequest struct {
	AffiliateID string `json:"affiliate_id"`
	CampaignID  string `json:"campaign_id"`
	Code        string `json:"code"`
}

func affiliateLinkGenerateHandler(w http.ResponseWriter, r *http.Request) {
	var req LinkGenerateRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, "invalid request payload")
		return
	}

	ctx := context.Background()

	// Check if code is already taken
	existing, _ := client.ReferralLink.FindUnique(
		db.ReferralLink.Code.Equals(req.Code),
	).Exec(ctx)

	if existing != nil {
		writeJSONError(w, http.StatusConflict, "this referral code slug is already taken")
		return
	}

	// Create new ReferralLink
	link, err := client.ReferralLink.CreateOne(
		db.ReferralLink.Campaign.Link(db.Campaign.ID.Equals(req.CampaignID)),
		db.ReferralLink.Affiliate.Link(db.User.ID.Equals(req.AffiliateID)),
		db.ReferralLink.Code.Set(req.Code),
		db.ReferralLink.Clicks.Set(0),
	).Exec(ctx)

	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, fmt.Sprintf("failed to generate referral link: %v", err))
		return
	}

	writeJSONSuccess(w, http.StatusCreated, map[string]string{
		"id":   link.ID,
		"code": link.Code,
	})
}

type WithdrawRequest struct {
	AffiliateID string `json:"affiliate_id"`
	Amount      int    `json:"amount"` // in kobo
	PIN         string `json:"pin"`
}

type WithdrawResponse struct {
	PendingBalance  int `json:"pending_balance"`
	ClearingBalance int `json:"clearing_balance"`
	ClearedBalance  int `json:"cleared_balance"`
	TotalWithdrawn  int `json:"total_withdrawn"`
}

func affiliateWithdrawHandler(w http.ResponseWriter, r *http.Request) {
	var req WithdrawRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, "invalid request payload")
		return
	}

	if req.PIN != "1234" {
		writeJSONError(w, http.StatusUnauthorized, "invalid security PIN")
		return
	}

	ctx := context.Background()

	// 1. Fetch Wallet
	wallet, err := client.Wallet.FindFirst(
		db.Wallet.OwnerID.Equals(req.AffiliateID),
		db.Wallet.OwnerType.Equals("affiliate"),
	).Exec(ctx)

	if err != nil {
		writeJSONError(w, http.StatusNotFound, "wallet not found")
		return
	}

	if wallet.ClearedBalance < req.Amount {
		writeJSONError(w, http.StatusBadRequest, "insufficient cleared balance")
		return
	}

	// 2. Perform withdrawal updates
	updated, err := client.Wallet.FindUnique(
		db.Wallet.ID.Equals(wallet.ID),
	).Update(
		db.Wallet.ClearedBalance.Decrement(req.Amount),
		db.Wallet.TotalWithdrawn.Increment(req.Amount),
	).Exec(ctx)

	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "failed to process withdrawal ledger update")
		return
	}

	writeJSONSuccess(w, http.StatusOK, WithdrawResponse{
		PendingBalance:  updated.PendingBalance,
		ClearingBalance: updated.ClearingBalance,
		ClearedBalance:  updated.ClearedBalance,
		TotalWithdrawn:  updated.TotalWithdrawn,
	})
}

type BankResolveRequest struct {
	BankCode      string `json:"bank_code"`
	AccountNumber string `json:"account_number"`
}

type BankResolveResponse struct {
	AccountName string `json:"account_name"`
}

func bankResolveHandler(w http.ResponseWriter, r *http.Request) {
	var req BankResolveRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, "invalid resolve request")
		return
	}

	if len(req.AccountNumber) != 10 {
		writeJSONError(w, http.StatusBadRequest, "account number must be exactly 10 digits")
		return
	}

	// Mock resolver lookup
	accountName := "Dwayne Tatum"
	if req.AccountNumber == "9999999999" {
		accountName = "Invalid Account Holder"
	}
	writeJSONSuccess(w, http.StatusOK, BankResolveResponse{
		AccountName: accountName,
	})
}

type LeaderboardUser struct {
	Rank        int    `json:"rank"`
	Name        string `json:"name"`
	Conversions int    `json:"conversions"`
	Earnings    string `json:"earnings"`
	Badge       string `json:"badge"`
	Active      bool   `json:"active"`
}

func affiliateLeaderboardHandler(w http.ResponseWriter, r *http.Request) {
	affiliateID := r.URL.Query().Get("affiliate_id")
	if affiliateID == "" {
		writeJSONError(w, http.StatusBadRequest, "missing affiliate_id parameter")
		return
	}

	ctx := context.Background()

	// Fetch conversions count for this affiliate
	var dwayneConversions int
	links, err := client.ReferralLink.FindMany(
		db.ReferralLink.AffiliateID.Equals(affiliateID),
	).Exec(ctx)
	if err == nil {
		var linkIDs []string
		for _, l := range links {
			linkIDs = append(linkIDs, l.ID)
		}
		if len(linkIDs) > 0 {
			convs, err := client.Conversion.FindMany(
				db.Conversion.ReferralLinkID.In(linkIDs),
			).Exec(ctx)
			if err == nil {
				dwayneConversions = len(convs)
			}
		}
	}

	// Fetch affiliate wallet total earned
	var dwayneEarnings int
	wallet, err := client.Wallet.FindFirst(
		db.Wallet.OwnerID.Equals(affiliateID),
		db.Wallet.OwnerType.Equals("affiliate"),
	).Exec(ctx)
	if err == nil {
		dwayneEarnings = wallet.TotalEarned
	}

	dwayneEarningsNGN := fmt.Sprintf("₦%.2f", float64(dwayneEarnings)/100.0)

	items := []LeaderboardUser{
		{Rank: 1, Name: "Chinedu Okafor", Conversions: 480, Earnings: "₦1,840,000.00", Badge: "Platinum", Active: false},
		{Rank: 2, Name: "Funmi Alao", Conversions: 198, Earnings: "₦780,000.00", Badge: "Gold", Active: false},
		{Rank: 3, Name: "Aisha Bello", Conversions: 62, Earnings: "₦240,000.00", Badge: "Silver", Active: false},
		{
			Rank:        4,
			Name:        "Dwayne Tatum (You)",
			Conversions: dwayneConversions,
			Earnings:    dwayneEarningsNGN,
			Badge:       "Silver",
			Active:      true,
		},
		{Rank: 5, Name: "Tunde Bakare", Conversions: 24, Earnings: "₦36,000.00", Badge: "Bronze", Active: false},
	}

	writeJSONSuccess(w, http.StatusOK, items)
}

func user2faGetHandler(w http.ResponseWriter, r *http.Request) {
	userID := r.URL.Query().Get("user_id")
	if userID == "" {
		writeJSONError(w, http.StatusBadRequest, "missing user_id")
		return
	}

	ctx := context.Background()
	user, err := client.User.FindUnique(
		db.User.ID.Equals(userID),
	).Exec(ctx)

	if err != nil {
		writeJSONError(w, http.StatusNotFound, "user not found")
		return
	}

	secret, ok := user.TwoFaSecret()
	enabled := ok && secret != ""

	writeJSONSuccess(w, http.StatusOK, map[string]interface{}{
		"enabled": enabled,
		"secret":  secret,
	})
}

type User2faToggleRequest struct {
	UserID string `json:"user_id"`
	Enable bool   `json:"enable"`
}

func user2faToggleHandler(w http.ResponseWriter, r *http.Request) {
	var req User2faToggleRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, "invalid request payload")
		return
	}

	ctx := context.Background()

	var err error
	if req.Enable {
		_, err = client.User.FindUnique(
			db.User.ID.Equals(req.UserID),
		).Update(
			db.User.TwoFaSecret.Set("RPL-2918-FA98-MFA"),
		).Exec(ctx)
	} else {
		_, err = client.User.FindUnique(
			db.User.ID.Equals(req.UserID),
		).Update(
			db.User.TwoFaSecret.SetOptional(nil),
		).Exec(ctx)
	}

	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "failed to update 2FA state")
		return
	}

	writeJSONSuccess(w, http.StatusOK, map[string]bool{
		"success": true,
	})
}

type Ticket struct {
	ID        string `json:"id"`
	Subject   string `json:"subject"`
	Details   string `json:"details"`
	Status    string `json:"status"`
	CreatedAt string `json:"created_at"`
}

var ticketsStore = make(map[string][]Ticket)
var ticketMutex sync.Mutex

func init() {
	// Seed some initial support tickets for the test affiliate
	ticketsStore["affiliate-user-uuid-1111"] = []Ticket{
		{
			ID:        "RPL-2918",
			Subject:   "Piggyvest Commission clearing delay",
			Details:   "Referrals from Piggyvest campaigns have been in clearing for more than 14 days.",
			Status:    "In Progress",
			CreatedAt: "Opened Yesterday",
		},
		{
			ID:        "RPL-2894",
			Subject:   "Access Bank account resolve issue",
			Details:   "Verification failed initially when resolving bank credentials.",
			Status:    "Resolved",
			CreatedAt: "Closed July 14, 2026",
		},
	}

	affiliateApplicationsStore["business-user-uuid-2222"] = []AffiliateApplication{
		{
			ID:          201,
			Name:        "Tunde Bakare",
			Niche:       "Fintech Content",
			Followers:   "45,000",
			Date:        "Today",
			AffiliateID: "affiliate-user-uuid-1111",
			CampaignID:  "campaign-uuid-9999",
		},
		{
			ID:          202,
			Name:        "Amina Yusuf",
			Niche:       "E-commerce Blogger",
			Followers:   "12,000",
			Date:        "Yesterday",
			AffiliateID: "affiliate-user-uuid-1111",
			CampaignID:  "campaign-uuid-zara",
		},
	}
}

func supportTicketsGetHandler(w http.ResponseWriter, r *http.Request) {
	userID := r.URL.Query().Get("user_id")
	if userID == "" {
		writeJSONError(w, http.StatusBadRequest, "missing user_id")
		return
	}

	ticketMutex.Lock()
	list, ok := ticketsStore[userID]
	if !ok {
		list = []Ticket{}
	}
	ticketMutex.Unlock()

	writeJSONSuccess(w, http.StatusOK, list)
}

type TicketCreateRequest struct {
	UserID  string `json:"user_id"`
	Subject string `json:"subject"`
	Details string `json:"details"`
}

func supportTicketsCreateHandler(w http.ResponseWriter, r *http.Request) {
	var req TicketCreateRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, "invalid request payload")
		return
	}

	if req.Subject == "" || req.Details == "" {
		writeJSONError(w, http.StatusBadRequest, "subject and details are required")
		return
	}

	ticketMutex.Lock()
	defer ticketMutex.Unlock()

	newTicket := Ticket{
		ID:        fmt.Sprintf("RPL-%d", 3000+rand.Intn(1000)),
		Subject:   req.Subject,
		Details:   req.Details,
		Status:    "Opened",
		CreatedAt: "Just Now",
	}

	ticketsStore[req.UserID] = append([]Ticket{newTicket}, ticketsStore[req.UserID]...)

	writeJSONSuccess(w, http.StatusCreated, newTicket)
}

type MerchantDashboardResponse struct {
	PendingBalance   int              `json:"pending_balance"`
	ClearingBalance  int              `json:"clearing_balance"`
	ClearedBalance   int              `json:"cleared_balance"`
	TotalEarned      int              `json:"total_earned"`
	TotalWithdrawn   int              `json:"total_withdrawn"`
	TotalCampaigns   int              `json:"total_campaigns"`
	TotalLinks       int              `json:"total_links"`
	TotalClicks      int              `json:"total_clicks"`
	TotalConversions int              `json:"total_conversions"`
	Conversions      []ConversionItem `json:"conversions"`
}

func merchantDashboardHandler(w http.ResponseWriter, r *http.Request) {
	merchantID := r.URL.Query().Get("merchant_id")
	if merchantID == "" {
		writeJSONError(w, http.StatusBadRequest, "missing merchant_id parameter")
		return
	}

	ctx := context.Background()

	// 1. Fetch Business
	business, err := client.Business.FindFirst(
		db.Business.UserID.Equals(merchantID),
	).Exec(ctx)

	if err != nil {
		writeJSONError(w, http.StatusNotFound, "business not found for merchant")
		return
	}

	// 2. Fetch Wallet
	wallet, err := client.Wallet.FindFirst(
		db.Wallet.OwnerID.Equals(business.ID),
		db.Wallet.OwnerType.Equals("business"),
	).Exec(ctx)

	if err != nil {
		// Fallback to merchant ID wallet if business ID wallet not found
		wallet, err = client.Wallet.FindFirst(
			db.Wallet.OwnerID.Equals(merchantID),
			db.Wallet.OwnerType.Equals("business"),
		).Exec(ctx)
	}

	pendingBalance := 0
	clearingBalance := 0
	clearedBalance := 0
	totalEarned := 0
	totalWithdrawn := 0

	if err == nil {
		pendingBalance = wallet.PendingBalance
		clearingBalance = wallet.ClearingBalance
		clearedBalance = wallet.ClearedBalance
		totalEarned = wallet.TotalEarned
		totalWithdrawn = wallet.TotalWithdrawn
	}

	// 3. Fetch Campaigns
	campaigns, err := client.Campaign.FindMany(
		db.Campaign.BusinessID.Equals(business.ID),
	).Exec(ctx)

	totalCampaigns := len(campaigns)
	var campaignIDs []string
	for _, c := range campaigns {
		campaignIDs = append(campaignIDs, c.ID)
	}

	// 4. Fetch Referral Links
	var links []db.ReferralLinkModel
	if len(campaignIDs) > 0 {
		links, _ = client.ReferralLink.FindMany(
			db.ReferralLink.CampaignID.In(campaignIDs),
		).With(
			db.ReferralLink.Campaign.Fetch(),
			db.ReferralLink.Affiliate.Fetch(),
		).Exec(ctx)
	}

	totalLinks := len(links)
	totalClicks := 0
	var linkIDs []string
	campaignNameMap := make(map[string]string)
	affiliateNameMap := make(map[string]string)
	for _, link := range links {
		totalClicks += link.Clicks
		linkIDs = append(linkIDs, link.ID)
		campaignNameMap[link.ID] = link.Campaign().Name
		affiliateNameMap[link.ID] = link.Affiliate().Email
	}

	// 5. Fetch Conversions
	var conversions []ConversionItem
	totalConversions := 0

	if len(linkIDs) > 0 {
		convs, err := client.Conversion.FindMany(
			db.Conversion.ReferralLinkID.In(linkIDs),
		).OrderBy(
			db.Conversion.ConvertedAt.Order(db.SortOrderDesc),
		).Exec(ctx)

		if err == nil {
			totalConversions = len(convs)
			for _, c := range convs {
				orderID := ""
				if val, ok := c.OrderID(); ok {
					orderID = val
				}
				ip := ""
				if val, ok := c.IPAddress(); ok {
					ip = val
				}
				utmSource := "direct"
				utmMedium := "none"
				if fp, ok := c.DeviceFingerprint(); ok {
					fmt.Sscanf(fp, "source=%s&medium=%s", &utmSource, &utmMedium)
					if len(utmSource) > 7 && utmSource[:7] == "source=" {
						utmSource = utmSource[7:]
					}
				}

				conversions = append(conversions, ConversionItem{
					ID:               c.ID,
					OrderID:          orderID,
					CampaignName:     campaignNameMap[c.ReferralLinkID],
					OrderValue:       c.OrderValue,
					CommissionAmount: c.CommissionAmount,
					Status:           c.Status,
					ConvertedAt:      c.ConvertedAt,
					IPAddress:        ip,
					UTMSource:        utmSource,
					UTMMedium:        utmMedium,
				})
			}
		}
	}

	writeJSONSuccess(w, http.StatusOK, MerchantDashboardResponse{
		PendingBalance:   pendingBalance,
		ClearingBalance:  clearingBalance,
		ClearedBalance:   clearedBalance,
		TotalEarned:      totalEarned,
		TotalWithdrawn:   totalWithdrawn,
		TotalCampaigns:   totalCampaigns,
		TotalLinks:       totalLinks,
		TotalClicks:      totalClicks,
		TotalConversions: totalConversions,
		Conversions:      conversions,
	})
}

type MerchantCampaignItem struct {
	ID                    string  `json:"id"`
	Name                  string  `json:"name"`
	TargetURL             string  `json:"target_url"`
	CommissionType        string  `json:"commission_type"`
	CommissionValue       float64 `json:"commission_value"`
	CookieDurationDays    int     `json:"cookie_duration_days"`
	Status                string  `json:"status"`
	ConversionsCount      int     `json:"conversions_count"`
	Revenue               int     `json:"revenue"` // in kobo
	Cost                  int     `json:"cost"`    // in kobo
}

func merchantCampaignsListHandler(w http.ResponseWriter, r *http.Request) {
	merchantID := r.URL.Query().Get("merchant_id")
	if merchantID == "" {
		writeJSONError(w, http.StatusBadRequest, "missing merchant_id parameter")
		return
	}

	ctx := context.Background()

	// 1. Fetch Business
	business, err := client.Business.FindFirst(
		db.Business.UserID.Equals(merchantID),
	).Exec(ctx)

	if err != nil {
		writeJSONError(w, http.StatusNotFound, "business not found")
		return
	}

	// 2. Fetch Campaigns
	campaigns, err := client.Campaign.FindMany(
		db.Campaign.BusinessID.Equals(business.ID),
	).Exec(ctx)

	if err != nil {
		writeJSONSuccess(w, http.StatusOK, []MerchantCampaignItem{})
		return
	}

	var items []MerchantCampaignItem
	for _, c := range campaigns {
		links, _ := client.ReferralLink.FindMany(
			db.ReferralLink.CampaignID.Equals(c.ID),
		).Exec(ctx)

		var linkIDs []string
		for _, l := range links {
			linkIDs = append(linkIDs, l.ID)
		}

		var convs []db.ConversionModel
		if len(linkIDs) > 0 {
			convs, _ = client.Conversion.FindMany(
				db.Conversion.ReferralLinkID.In(linkIDs),
			).Exec(ctx)
		}

		conversionsCount := 0
		revenue := 0
		cost := 0

		if err == nil {
			conversionsCount = len(convs)
			for _, conv := range convs {
				if conv.Status == "approved" || conv.Status == "paid" || conv.Status == "cleared" || conv.Status == "clearing" || conv.Status == "pending" {
					revenue += conv.OrderValue
					cost += conv.CommissionAmount
				}
			}
		}

		items = append(items, MerchantCampaignItem{
			ID:                 c.ID,
			Name:               c.Name,
			TargetURL:          c.TargetURL,
			CommissionType:     c.CommissionType,
			CommissionValue:    c.CommissionValue,
			CookieDurationDays: c.CookieDurationDays,
			Status:             c.Status,
			ConversionsCount:   conversionsCount,
			Revenue:            revenue,
			Cost:               cost,
		})
	}

	writeJSONSuccess(w, http.StatusOK, items)
}

type CampaignCreateRequest struct {
	MerchantID         string  `json:"merchant_id"`
	Name               string  `json:"name"`
	TargetURL          string  `json:"target_url"`
	CommissionType     string  `json:"commission_type"`
	CommissionValue    float64 `json:"commission_value"`
	CookieDurationDays int     `json:"cookie_duration_days"`
}

func merchantCampaignCreateHandler(w http.ResponseWriter, r *http.Request) {
	var req CampaignCreateRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, "invalid request payload")
		return
	}

	ctx := context.Background()

	// 1. Fetch Business
	business, err := client.Business.FindFirst(
		db.Business.UserID.Equals(req.MerchantID),
	).Exec(ctx)

	if err != nil {
		writeJSONError(w, http.StatusNotFound, "business not found for merchant")
		return
	}

	// 2. Create Campaign in SQLite
	campaign, err := client.Campaign.CreateOne(
		db.Campaign.Business.Link(db.Business.ID.Equals(business.ID)),
		db.Campaign.Name.Set(req.Name),
		db.Campaign.CommissionType.Set(req.CommissionType),
		db.Campaign.CommissionValue.Set(req.CommissionValue),
		db.Campaign.TargetURL.Set(req.TargetURL),
		db.Campaign.CookieDurationDays.Set(req.CookieDurationDays),
		db.Campaign.AttributionWindowDays.Set(30),
		db.Campaign.Status.Set("active"),
	).Exec(ctx)

	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, fmt.Sprintf("failed to create campaign: %v", err))
		return
	}

	writeJSONSuccess(w, http.StatusCreated, campaign)
}

type AffiliateApplication struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	Niche       string `json:"niche"`
	Followers   string `json:"followers"`
	Date        string `json:"date"`
	AffiliateID string `json:"affiliate_id"`
	CampaignID  string `json:"campaign_id"`
}

var affiliateApplicationsStore = make(map[string][]AffiliateApplication)
var affiliateAppMutex sync.Mutex

type MerchantAffiliatesResponse struct {
	Enrolled     []MerchantAffiliateItem `json:"enrolled"`
	Applications []AffiliateApplication  `json:"applications"`
}

type MerchantAffiliateItem struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Email       string `json:"email"`
	Conversions int    `json:"conversions"`
	Revenue     int    `json:"revenue"`
	Status      string `json:"status"`
}

func merchantAffiliatesHandler(w http.ResponseWriter, r *http.Request) {
	merchantID := r.URL.Query().Get("merchant_id")
	if merchantID == "" {
		writeJSONError(w, http.StatusBadRequest, "missing merchant_id parameter")
		return
	}

	ctx := context.Background()

	business, err := client.Business.FindFirst(
		db.Business.UserID.Equals(merchantID),
	).Exec(ctx)

	if err != nil {
		writeJSONError(w, http.StatusNotFound, "business not found")
		return
	}

	campaigns, _ := client.Campaign.FindMany(
		db.Campaign.BusinessID.Equals(business.ID),
	).Exec(ctx)

	var campaignIDs []string
	for _, c := range campaigns {
		campaignIDs = append(campaignIDs, c.ID)
	}

	var links []db.ReferralLinkModel
	if len(campaignIDs) > 0 {
		links, err = client.ReferralLink.FindMany(
			db.ReferralLink.CampaignID.In(campaignIDs),
		).With(
			db.ReferralLink.Affiliate.Fetch(),
		).Exec(ctx)
	}

	var enrolled []MerchantAffiliateItem
	if err == nil {
		affMap := make(map[string]*MerchantAffiliateItem)
		for _, link := range links {
			convs, _ := client.Conversion.FindMany(
				db.Conversion.ReferralLinkID.Equals(link.ID),
			).Exec(ctx)

			revenue := 0
			for _, c := range convs {
				revenue += c.OrderValue
			}

			affID := link.Affiliate().ID
			if item, exists := affMap[affID]; exists {
				item.Conversions += len(convs)
				item.Revenue += revenue
			} else {
				affMap[affID] = &MerchantAffiliateItem{
					ID:          affID,
					Name:        link.Affiliate().Email,
					Email:       link.Affiliate().Email,
					Conversions: len(convs),
					Revenue:     revenue,
					Status:      link.Affiliate().Status,
				}
			}
		}

		for _, item := range affMap {
			enrolled = append(enrolled, *item)
		}
	}

	affiliateAppMutex.Lock()
	apps := affiliateApplicationsStore[merchantID]
	if apps == nil {
		apps = []AffiliateApplication{}
	}
	affiliateAppMutex.Unlock()

	writeJSONSuccess(w, http.StatusOK, MerchantAffiliatesResponse{
		Enrolled:     enrolled,
		Applications: apps,
	})
}

type AffiliateApproveRequest struct {
	MerchantID    string `json:"merchant_id"`
	ApplicationID int    `json:"application_id"`
}

func merchantAffiliateApproveHandler(w http.ResponseWriter, r *http.Request) {
	var req AffiliateApproveRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, "invalid request payload")
		return
	}

	affiliateAppMutex.Lock()
	defer affiliateAppMutex.Unlock()

	apps := affiliateApplicationsStore[req.MerchantID]
	var foundIndex = -1
	var targetApp AffiliateApplication
	for i, app := range apps {
		if app.ID == req.ApplicationID {
			foundIndex = i
			targetApp = app
			break
		}
	}

	if foundIndex == -1 {
		writeJSONError(w, http.StatusNotFound, "application request not found")
		return
	}

	ctx := context.Background()
	codeSlug := fmt.Sprintf("promo-%d", req.ApplicationID)

	_, err := client.ReferralLink.CreateOne(
		db.ReferralLink.Campaign.Link(db.Campaign.ID.Equals(targetApp.CampaignID)),
		db.ReferralLink.Affiliate.Link(db.User.ID.Equals(targetApp.AffiliateID)),
		db.ReferralLink.Code.Set(codeSlug),
		db.ReferralLink.Clicks.Set(0),
	).Exec(ctx)

	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, fmt.Sprintf("failed to enroll affiliate: %v", err))
		return
	}

	affiliateApplicationsStore[req.MerchantID] = append(apps[:foundIndex], apps[foundIndex+1:]...)

	writeJSONSuccess(w, http.StatusOK, map[string]bool{
		"success": true,
	})
}

func merchantAffiliateRejectHandler(w http.ResponseWriter, r *http.Request) {
	var req AffiliateApproveRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, "invalid request payload")
		return
	}

	affiliateAppMutex.Lock()
	defer affiliateAppMutex.Unlock()

	apps := affiliateApplicationsStore[req.MerchantID]
	var foundIndex = -1
	for i, app := range apps {
		if app.ID == req.ApplicationID {
			foundIndex = i
			break
		}
	}

	if foundIndex == -1 {
		writeJSONError(w, http.StatusNotFound, "application request not found")
		return
	}

	affiliateApplicationsStore[req.MerchantID] = append(apps[:foundIndex], apps[foundIndex+1:]...)

	writeJSONSuccess(w, http.StatusOK, map[string]bool{
		"success": true,
	})
}

type MerchantPayoutItem struct {
	ID               string    `json:"id"`
	AffiliateName    string    `json:"affiliate_name"`
	CampaignName     string    `json:"campaign_name"`
	CommissionAmount int       `json:"commission_amount"`
	OrderValue       int       `json:"order_value"`
	RiskScore        int       `json:"risk_score"`
	Status           string    `json:"status"`
	ConvertedAt      time.Time `json:"converted_at"`
}

type MerchantPayoutsResponse struct {
	Pending  []MerchantPayoutItem `json:"pending"`
	Disputed []MerchantPayoutItem `json:"disputed"`
}

func merchantPayoutsHandler(w http.ResponseWriter, r *http.Request) {
	merchantID := r.URL.Query().Get("merchant_id")
	if merchantID == "" {
		writeJSONError(w, http.StatusBadRequest, "missing merchant_id parameter")
		return
	}

	ctx := context.Background()

	// 1. Fetch Business
	business, err := client.Business.FindFirst(
		db.Business.UserID.Equals(merchantID),
	).Exec(ctx)

	if err != nil {
		writeJSONError(w, http.StatusNotFound, "business not found")
		return
	}

	// 2. Fetch campaigns and links
	campaigns, err := client.Campaign.FindMany(
		db.Campaign.BusinessID.Equals(business.ID),
	).Exec(ctx)

	var campaignIDs []string
	campaignNames := make(map[string]string)
	for _, c := range campaigns {
		campaignIDs = append(campaignIDs, c.ID)
		campaignNames[c.ID] = c.Name
	}

	var links []db.ReferralLinkModel
	linkCampaignIDs := make(map[string]string)
	linkAffiliateEmails := make(map[string]string)
	if len(campaignIDs) > 0 {
		links, _ = client.ReferralLink.FindMany(
			db.ReferralLink.CampaignID.In(campaignIDs),
		).With(
			db.ReferralLink.Affiliate.Fetch(),
		).Exec(ctx)
	}

	var linkIDs []string
	for _, l := range links {
		linkIDs = append(linkIDs, l.ID)
		linkCampaignIDs[l.ID] = l.CampaignID
		linkAffiliateEmails[l.ID] = l.Affiliate().Email
	}

	var pending []MerchantPayoutItem
	var disputed []MerchantPayoutItem

	if len(linkIDs) > 0 {
		convs, err := client.Conversion.FindMany(
			db.Conversion.ReferralLinkID.In(linkIDs),
		).OrderBy(
			db.Conversion.ConvertedAt.Order(db.SortOrderDesc),
		).Exec(ctx)

		if err == nil {
			for _, c := range convs {
				risk := 5
				if c.Status == "rejected" {
					risk = 75
				} else if c.OrderValue > 3000000 {
					risk = 25
				}

				item := MerchantPayoutItem{
					ID:               c.ID,
					AffiliateName:    linkAffiliateEmails[c.ReferralLinkID],
					CampaignName:     campaignNames[linkCampaignIDs[c.ReferralLinkID]],
					CommissionAmount: c.CommissionAmount,
					OrderValue:       c.OrderValue,
					RiskScore:        risk,
					Status:           c.Status,
					ConvertedAt:      c.ConvertedAt,
				}

				if c.Status == "rejected" {
					disputed = append(disputed, item)
				} else if c.Status == "pending" || c.Status == "clearing" {
					pending = append(pending, item)
				}
			}
		}
	}

	writeJSONSuccess(w, http.StatusOK, MerchantPayoutsResponse{
		Pending:  pending,
		Disputed: disputed,
	})
}

type PayoutApproveRequest struct {
	MerchantID   string `json:"merchant_id"`
	ConversionID string `json:"conversion_id"`
}

func merchantPayoutApproveHandler(w http.ResponseWriter, r *http.Request) {
	var req PayoutApproveRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, "invalid request payload")
		return
	}

	ctx := context.Background()

	conversion, err := client.Conversion.FindFirst(
		db.Conversion.ID.Equals(req.ConversionID),
	).With(
		db.Conversion.ReferralLink.Fetch(),
	).Exec(ctx)

	if err != nil {
		writeJSONError(w, http.StatusNotFound, "conversion not found")
		return
	}

	link := conversion.ReferralLink()
	affiliateID := link.AffiliateID

	_, err = client.Conversion.FindUnique(
		db.Conversion.ID.Equals(req.ConversionID),
	).Update(
		db.Conversion.Status.Set("approved"),
	).Exec(ctx)

	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "failed to update conversion status")
		return
	}

	business, _ := client.Business.FindFirst(
		db.Business.UserID.Equals(req.MerchantID),
	).Exec(ctx)

	if business != nil {
		merchantWallet, err := client.Wallet.FindFirst(
			db.Wallet.OwnerID.Equals(business.ID),
			db.Wallet.OwnerType.Equals("business"),
		).Exec(ctx)

		if err == nil {
			client.Wallet.FindUnique(
				db.Wallet.ID.Equals(merchantWallet.ID),
			).Update(
				db.Wallet.ClearedBalance.Decrement(conversion.CommissionAmount),
			).Exec(ctx)
		}
	}

	affiliateWallet, err := client.Wallet.FindFirst(
		db.Wallet.OwnerID.Equals(affiliateID),
		db.Wallet.OwnerType.Equals("affiliate"),
	).Exec(ctx)

	if err == nil {
		client.Wallet.FindUnique(
			db.Wallet.ID.Equals(affiliateWallet.ID),
		).Update(
			db.Wallet.ClearedBalance.Increment(conversion.CommissionAmount),
			db.Wallet.TotalEarned.Increment(conversion.CommissionAmount),
		).Exec(ctx)
	}

	dispatchWebhook(req.MerchantID, "payout.approved", map[string]string{
		"conversion_id": req.ConversionID,
		"status":        "approved",
	})

	writeJSONSuccess(w, http.StatusOK, map[string]bool{"success": true})
}

func merchantPayoutRejectHandler(w http.ResponseWriter, r *http.Request) {
	var req PayoutApproveRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, "invalid request payload")
		return
	}

	ctx := context.Background()

	_, err := client.Conversion.FindUnique(
		db.Conversion.ID.Equals(req.ConversionID),
	).Update(
		db.Conversion.Status.Set("rejected"),
	).Exec(ctx)

	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "failed to reject payout")
		return
	}

	dispatchWebhook(req.MerchantID, "payout.rejected", map[string]string{
		"conversion_id": req.ConversionID,
		"status":        "rejected",
	})

	writeJSONSuccess(w, http.StatusOK, map[string]bool{"success": true})
}

type WalletFundRequest struct {
	MerchantID string `json:"merchant_id"`
	Amount     int    `json:"amount"`
}

func merchantWalletFundHandler(w http.ResponseWriter, r *http.Request) {
	var req WalletFundRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, "invalid request payload")
		return
	}

	if req.Amount <= 0 {
		writeJSONError(w, http.StatusBadRequest, "amount must be greater than zero")
		return
	}

	ctx := context.Background()

	business, err := client.Business.FindFirst(
		db.Business.UserID.Equals(req.MerchantID),
	).Exec(ctx)

	if err != nil {
		writeJSONError(w, http.StatusNotFound, "business not found")
		return
	}

	wallet, err := client.Wallet.FindFirst(
		db.Wallet.OwnerID.Equals(business.ID),
		db.Wallet.OwnerType.Equals("business"),
	).Exec(ctx)

	if err != nil {
		writeJSONError(w, http.StatusNotFound, "wallet not found")
		return
	}

	amountKobo := req.Amount * 100

	_, err = client.Wallet.FindUnique(
		db.Wallet.ID.Equals(wallet.ID),
	).Update(
		db.Wallet.ClearedBalance.Increment(amountKobo),
	).Exec(ctx)

	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "failed to fund wallet reserves")
		return
	}

	writeJSONSuccess(w, http.StatusOK, map[string]bool{"success": true})
}

type AdminOverviewResponse struct {
	TotalAffiliates  int              `json:"total_affiliates"`
	TotalBusinesses  int              `json:"total_businesses"`
	TotalCampaigns   int              `json:"total_campaigns"`
	TotalClicks      int              `json:"total_clicks"`
	TotalConversions int              `json:"total_conversions"`
	PlatformGMV      int              `json:"platform_gmv"`
	TotalCommissions int              `json:"total_commissions"`
	RecentConversions []ConversionItem `json:"recent_conversions"`
}

func adminOverviewHandler(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()

	affiliatesCount, _ := client.User.FindMany(
		db.User.Role.Equals("affiliate"),
	).Exec(ctx)

	businessesCount, _ := client.User.FindMany(
		db.User.Role.Equals("business_admin"),
	).Exec(ctx)

	campaigns, _ := client.Campaign.FindMany().Exec(ctx)

	links, _ := client.ReferralLink.FindMany().With(
		db.ReferralLink.Campaign.Fetch(),
	).Exec(ctx)

	totalClicks := 0
	campaignNameMap := make(map[string]string)
	for _, l := range links {
		totalClicks += l.Clicks
		campaignNameMap[l.ID] = l.Campaign().Name
	}

	convs, _ := client.Conversion.FindMany().OrderBy(
		db.Conversion.ConvertedAt.Order(db.SortOrderDesc),
	).Exec(ctx)

	platformGMV := 0
	totalCommissions := 0
	var recent []ConversionItem

	for i, c := range convs {
		if c.Status == "approved" || c.Status == "paid" || c.Status == "cleared" || c.Status == "clearing" {
			platformGMV += c.OrderValue
			totalCommissions += c.CommissionAmount
		}

		orderID := ""
		if val, ok := c.OrderID(); ok {
			orderID = val
		}
		ip := ""
		if val, ok := c.IPAddress(); ok {
			ip = val
		}

		if i < 10 {
			recent = append(recent, ConversionItem{
				ID:               c.ID,
				OrderID:          orderID,
				CampaignName:     campaignNameMap[c.ReferralLinkID],
				OrderValue:       c.OrderValue,
				CommissionAmount: c.CommissionAmount,
				Status:           c.Status,
				ConvertedAt:      c.ConvertedAt,
				IPAddress:        ip,
			})
		}
	}

	writeJSONSuccess(w, http.StatusOK, AdminOverviewResponse{
		TotalAffiliates:  len(affiliatesCount),
		TotalBusinesses:  len(businessesCount),
		TotalCampaigns:   len(campaigns),
		TotalClicks:      totalClicks,
		TotalConversions: len(convs),
		PlatformGMV:      platformGMV,
		TotalCommissions: totalCommissions,
		RecentConversions: recent,
	})
}

type BusinessVerification struct {
	ID        int    `json:"id"`
	Name      string `json:"name"`
	CacNumber string `json:"cac_number"`
	Director  string `json:"director"`
	Date      string `json:"date"`
	Status    string `json:"status"`
	UserID    string `json:"user_id"`
}

type KycVerification struct {
	ID          int    `json:"id"`
	Name        string `json:"name"`
	BvnMatch    string `json:"bvn_match"`
	DocType     string `json:"doc_type"`
	SelfieMatch string `json:"selfie_match"`
	Status      string `json:"status"`
	UserID      string `json:"user_id"`
}

var businessQueueStore = []BusinessVerification{
	{
		ID:        1,
		Name:      "Shopify Merchant LLC",
		CacNumber: "RC1928374",
		Director:  "Jane Doe",
		Date:      "Yesterday",
		Status:    "Pending Verification",
		UserID:    "business-user-uuid-2222",
	},
	{
		ID:        2,
		Name:      "WooCommerce Seller Corp",
		CacNumber: "RC2938475",
		Director:  "John Smith",
		Date:      "July 15, 2026",
		Status:    "Pending Verification",
		UserID:    "business-user-uuid-2222",
	},
}

var kycQueueStore = []KycVerification{
	{
		ID:          101,
		Name:        "Funmi Alao",
		BvnMatch:    "92%",
		DocType:     "NIN Slip",
		SelfieMatch: "95% (Match)",
		Status:      "Pending Review",
		UserID:      "affiliate-user-uuid-1111",
	},
	{
		ID:          102,
		Name:        "Chinedu Okafor",
		BvnMatch:    "88%",
		DocType:     "Driver's License",
		SelfieMatch: "91% (Match)",
		Status:      "Pending Review",
		UserID:      "affiliate-user-uuid-1111",
	},
}

var verificationMutex sync.Mutex

func adminVerificationsHandler(w http.ResponseWriter, r *http.Request) {
	verificationMutex.Lock()
	defer verificationMutex.Unlock()

	writeJSONSuccess(w, http.StatusOK, map[string]interface{}{
		"businesses": businessQueueStore,
		"kyc":        kycQueueStore,
	})
}

type VerificationActionRequest struct {
	ID int `json:"id"`
}

func adminBusinessApproveHandler(w http.ResponseWriter, r *http.Request) {
	var req VerificationActionRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, "invalid request payload")
		return
	}

	verificationMutex.Lock()
	defer verificationMutex.Unlock()

	found := false
	for i, item := range businessQueueStore {
		if item.ID == req.ID {
			businessQueueStore[i].Status = "Verified"
			found = true

			ctx := context.Background()
			client.User.FindUnique(
				db.User.ID.Equals(item.UserID),
			).Update(
				db.User.Status.Set("active"),
			).Exec(ctx)
			break
		}
	}

	if !found {
		writeJSONError(w, http.StatusNotFound, "verification item not found")
		return
	}

	writeJSONSuccess(w, http.StatusOK, map[string]bool{"success": true})
}

func adminBusinessRejectHandler(w http.ResponseWriter, r *http.Request) {
	var req VerificationActionRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, "invalid request payload")
		return
	}

	verificationMutex.Lock()
	defer verificationMutex.Unlock()

	found := false
	for i, item := range businessQueueStore {
		if item.ID == req.ID {
			businessQueueStore[i].Status = "Rejected"
			found = true
			break
		}
	}

	if !found {
		writeJSONError(w, http.StatusNotFound, "verification item not found")
		return
	}

	writeJSONSuccess(w, http.StatusOK, map[string]bool{"success": true})
}

func adminKycApproveHandler(w http.ResponseWriter, r *http.Request) {
	var req VerificationActionRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, "invalid request payload")
		return
	}

	verificationMutex.Lock()
	defer verificationMutex.Unlock()

	found := false
	for i, item := range kycQueueStore {
		if item.ID == req.ID {
			kycQueueStore[i].Status = "Approved"
			found = true

			ctx := context.Background()
			client.User.FindUnique(
				db.User.ID.Equals(item.UserID),
			).Update(
				db.User.KycTier.Set("enhanced"),
			).Exec(ctx)
			break
		}
	}

	if !found {
		writeJSONError(w, http.StatusNotFound, "KYC item not found")
		return
	}

	writeJSONSuccess(w, http.StatusOK, map[string]bool{"success": true})
}

func adminKycRejectHandler(w http.ResponseWriter, r *http.Request) {
	var req VerificationActionRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, "invalid request payload")
		return
	}

	verificationMutex.Lock()
	defer verificationMutex.Unlock()

	found := false
	for i, item := range kycQueueStore {
		if item.ID == req.ID {
			kycQueueStore[i].Status = "Rejected"
			found = true
			break
		}
	}

	if !found {
		writeJSONError(w, http.StatusNotFound, "KYC item not found")
		return
	}

	writeJSONSuccess(w, http.StatusOK, map[string]bool{"success": true})
}

var businessPlansStore = make(map[string]string)
var businessPlansMutex sync.Mutex

func init() {
	businessPlansStore["business-uuid-2222"] = "Pro Plan"
}

type AdminBusinessItem struct {
	ID              string `json:"id"`
	Name            string `json:"name"`
	Plan            string `json:"plan"`
	Volume          int    `json:"volume"` // in kobo
	ActiveCampaigns int    `json:"active_campaigns"`
	AffiliatesCount int    `json:"affiliates_count"`
	Status          string `json:"status"`
}

func adminBusinessesListHandler(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()

	businesses, err := client.Business.FindMany().With(
		db.Business.User.Fetch(),
	).Exec(ctx)

	if err != nil {
		writeJSONSuccess(w, http.StatusOK, []AdminBusinessItem{})
		return
	}

	var items []AdminBusinessItem
	businessPlansMutex.Lock()
	defer businessPlansMutex.Unlock()

	for _, b := range businesses {
		camps, _ := client.Campaign.FindMany(
			db.Campaign.BusinessID.Equals(b.ID),
		).Exec(ctx)

		var campIDs []string
		for _, cp := range camps {
			campIDs = append(campIDs, cp.ID)
		}

		affiliatesCount := 0
		var links []db.ReferralLinkModel
		if len(campIDs) > 0 {
			links, _ = client.ReferralLink.FindMany(
				db.ReferralLink.CampaignID.In(campIDs),
			).Exec(ctx)
		}

		uniqueAffiliates := make(map[string]bool)
		var linkIDs []string
		for _, l := range links {
			uniqueAffiliates[l.AffiliateID] = true
			linkIDs = append(linkIDs, l.ID)
		}
		affiliatesCount = len(uniqueAffiliates)

		volume := 0
		if len(linkIDs) > 0 {
			convs, _ := client.Conversion.FindMany(
				db.Conversion.ReferralLinkID.In(linkIDs),
				db.Conversion.Status.Equals("approved"),
			).Exec(ctx)

			for _, cv := range convs {
				volume += cv.OrderValue
			}
		}

		plan, ok := businessPlansStore[b.ID]
		if !ok {
			plan = "Basic Plan"
		}

		items = append(items, AdminBusinessItem{
			ID:              b.ID,
			Name:            b.Name,
			Plan:            plan,
			Volume:          volume,
			ActiveCampaigns: len(camps),
			AffiliatesCount: affiliatesCount,
			Status:          b.User().Status,
		})
	}

	writeJSONSuccess(w, http.StatusOK, items)
}

type BusinessPlanUpdateRequest struct {
	BusinessID string `json:"business_id"`
	Plan       string `json:"plan"`
}

func adminBusinessPlanUpdateHandler(w http.ResponseWriter, r *http.Request) {
	var req BusinessPlanUpdateRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, "invalid request payload")
		return
	}

	if req.BusinessID == "" || req.Plan == "" {
		writeJSONError(w, http.StatusBadRequest, "business_id and plan are required")
		return
	}

	businessPlansMutex.Lock()
	businessPlansStore[req.BusinessID] = req.Plan
	businessPlansMutex.Unlock()

	writeJSONSuccess(w, http.StatusOK, map[string]bool{"success": true})
}

type AdminAffiliateItem struct {
	ID             string `json:"id"`
	Name           string `json:"name"`
	KycTier        string `json:"kyc_tier"`
	TotalEarned    int    `json:"total_earned"`
	TotalWithdrawn int    `json:"total_withdrawn"`
	Status         string `json:"status"`
}

func adminAffiliatesListHandler(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()

	affiliates, err := client.User.FindMany(
		db.User.Role.Equals("affiliate"),
	).Exec(ctx)

	if err != nil {
		writeJSONSuccess(w, http.StatusOK, []AdminAffiliateItem{})
		return
	}

	var items []AdminAffiliateItem
	for _, a := range affiliates {
		wallet, err := client.Wallet.FindFirst(
			db.Wallet.OwnerID.Equals(a.ID),
			db.Wallet.OwnerType.Equals("affiliate"),
		).Exec(ctx)

		totalEarned := 0
		totalWithdrawn := 0
		if err == nil && wallet != nil {
			totalEarned = wallet.TotalEarned
			totalWithdrawn = wallet.TotalWithdrawn
		}

		kycTier := "standard"
		if val, ok := a.KycTier(); ok {
			kycTier = val
		}

		items = append(items, AdminAffiliateItem{
			ID:             a.ID,
			Name:           a.Email,
			KycTier:        kycTier,
			TotalEarned:    totalEarned,
			TotalWithdrawn: totalWithdrawn,
			Status:         a.Status,
		})
	}

	writeJSONSuccess(w, http.StatusOK, items)
}

type AffiliateRestrictRequest struct {
	AffiliateID string `json:"affiliate_id"`
	Restrict    bool   `json:"restrict"`
}

func adminAffiliateRestrictHandler(w http.ResponseWriter, r *http.Request) {
	var req AffiliateRestrictRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, "invalid request payload")
		return
	}

	if req.AffiliateID == "" {
		writeJSONError(w, http.StatusBadRequest, "affiliate_id is required")
		return
	}

	status := "active"
	if req.Restrict {
		status = "restricted"
	}

	ctx := context.Background()
	_, err := client.User.FindUnique(
		db.User.ID.Equals(req.AffiliateID),
	).Update(
		db.User.Status.Set(status),
	).Exec(ctx)

	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "failed to update affiliate status")
		return
	}

	writeJSONSuccess(w, http.StatusOK, map[string]bool{"success": true})
}

type AdminLedgerItem struct {
	ID       string `json:"id"`
	Business string `json:"business"`
	Type     string `json:"type"`
	Amount   int    `json:"amount"` // in kobo
	Status   string `json:"status"`
	Date     string `json:"date"`
}

func adminLedgerHandler(w http.ResponseWriter, r *http.Request) {
	ctx := context.Background()

	var items []AdminLedgerItem

	businesses, err := client.Business.FindMany().Exec(ctx)
	if err == nil {
		for i, b := range businesses {
			plan, ok := businessPlansStore[b.ID]
			if !ok {
				plan = "Pro Plan"
			}
			amount := 1500000
			if plan == "Pro Plan" || plan == "Enterprise Plan" {
				amount = 4500000
			}

			items = append(items, AdminLedgerItem{
				ID:       fmt.Sprintf("TX-10%d", i),
				Business: b.Name,
				Type:     fmt.Sprintf("Subscription (%s)", plan),
				Amount:   amount,
				Status:   "reconciled",
				Date:     "Today",
			})
		}
	}

	convs, err := client.Conversion.FindMany(
		db.Conversion.Status.Equals("approved"),
	).Exec(ctx)

	if err == nil {
		for i, c := range convs {
			items = append(items, AdminLedgerItem{
				ID:       fmt.Sprintf("TX-20%d", i),
				Business: "Attribution Clearing",
				Type:     "Payout Settlement",
				Amount:   c.CommissionAmount,
				Status:   "reconciled",
				Date:     c.ConvertedAt.Format("2006-01-02"),
			})
		}
	}

	if len(items) == 0 {
		items = []AdminLedgerItem{
			{ID: "TX-901", Business: "Kola Stores Ltd", Type: "Subscription Fee", Amount: 4500000, Status: "reconciled", Date: "Today"},
			{ID: "TX-902", Business: "Flutterwave Merchant", Type: "Cashout Transaction Fee", Amount: 122000, Status: "reconciled", Date: "Today"},
		}
	}

	writeJSONSuccess(w, http.StatusOK, items)
}

var configCommissionCut = "1.5"
var configClearingDays = "14"
var configMinCashout = "2000"
var configMutex sync.Mutex

type SystemConfigRequest struct {
	CommissionCut string `json:"commission_cut"`
	ClearingDays  string `json:"clearing_days"`
	MinCashout    string `json:"min_cashout"`
}

func adminConfigGetHandler(w http.ResponseWriter, r *http.Request) {
	configMutex.Lock()
	defer configMutex.Unlock()

	writeJSONSuccess(w, http.StatusOK, SystemConfigRequest{
		CommissionCut: configCommissionCut,
		ClearingDays:  configClearingDays,
		MinCashout:    configMinCashout,
	})
}

func adminConfigUpdateHandler(w http.ResponseWriter, r *http.Request) {
	var req SystemConfigRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, "invalid request payload")
		return
	}

	configMutex.Lock()
	configCommissionCut = req.CommissionCut
	configClearingDays = req.ClearingDays
	configMinCashout = req.MinCashout
	configMutex.Unlock()

	writeJSONSuccess(w, http.StatusOK, map[string]bool{"success": true})
}

func userOnboardingGetHandler(w http.ResponseWriter, r *http.Request) {
	userID := r.URL.Query().Get("user_id")
	if userID == "" {
		writeJSONError(w, http.StatusBadRequest, "missing user_id parameter")
		return
	}

	dir := "./data/onboarding"
	filePath := filepath.Join(dir, userID+".json")

	data, err := os.ReadFile(filePath)
	if err != nil {
		defaultChecklist := `{"profile":true}`
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(defaultChecklist))
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(data)
}

type UserOnboardingPostRequest struct {
	UserID   string          `json:"user_id"`
	Progress json.RawMessage `json:"progress"`
}

func userOnboardingPostHandler(w http.ResponseWriter, r *http.Request) {
	var req UserOnboardingPostRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, "invalid request payload")
		return
	}

	dir := "./data/onboarding"
	if err := os.MkdirAll(dir, 0755); err != nil {
		writeJSONError(w, http.StatusInternalServerError, "failed to create storage directory")
		return
	}

	filePath := filepath.Join(dir, req.UserID+".json")
	if err := os.WriteFile(filePath, req.Progress, 0644); err != nil {
		writeJSONError(w, http.StatusInternalServerError, "failed to save onboarding checklist")
		return
	}

	writeJSONSuccess(w, http.StatusOK, map[string]bool{"success": true})
}

type WebhookConfigRequest struct {
	MerchantID string `json:"merchant_id"`
	WebhookURL string `json:"webhook_url"`
}

func merchantWebhookGetHandler(w http.ResponseWriter, r *http.Request) {
	merchantID := r.URL.Query().Get("merchant_id")
	if merchantID == "" {
		writeJSONError(w, http.StatusBadRequest, "missing merchant_id parameter")
		return
	}

	dir := "./data/webhooks"
	filePath := filepath.Join(dir, merchantID+".json")

	data, err := os.ReadFile(filePath)
	if err != nil {
		writeJSONSuccess(w, http.StatusOK, map[string]string{"webhook_url": ""})
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(data)
}

func merchantWebhookConfigureHandler(w http.ResponseWriter, r *http.Request) {
	var req WebhookConfigRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, "invalid request payload")
		return
	}

	dir := "./data/webhooks"
	if err := os.MkdirAll(dir, 0755); err != nil {
		writeJSONError(w, http.StatusInternalServerError, "failed to create storage directory")
		return
	}

	filePath := filepath.Join(dir, req.MerchantID+".json")
	jsonData, err := json.Marshal(req)
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "failed to serialize config")
		return
	}

	if err := os.WriteFile(filePath, jsonData, 0644); err != nil {
		writeJSONError(w, http.StatusInternalServerError, "failed to save webhook configuration")
		return
	}

	writeJSONSuccess(w, http.StatusOK, map[string]bool{"success": true})
}

func dispatchWebhook(merchantID string, eventType string, payload interface{}) {
	dir := "./data/webhooks"
	filePath := filepath.Join(dir, merchantID+".json")

	data, err := os.ReadFile(filePath)
	if err != nil {
		log.Printf("No webhook configured for merchant: %s", merchantID)
		return
	}

	var config WebhookConfigRequest
	if err := json.Unmarshal(data, &config); err != nil {
		log.Printf("Failed to parse webhook config for merchant: %s", merchantID)
		return
	}

	if config.WebhookURL == "" {
		return
	}

	go func() {
		eventData := map[string]interface{}{
			"event":      eventType,
			"timestamp":  time.Now(),
			"merchant":   merchantID,
			"data":       payload,
		}

		jsonData, err := json.Marshal(eventData)
		if err != nil {
			log.Printf("Failed to marshal webhook payload: %v", err)
			return
		}

		req, err := http.NewRequest("POST", config.WebhookURL, bytes.NewBuffer(jsonData))
		if err != nil {
			log.Printf("Failed to create webhook request: %v", err)
			return
		}

		req.Header.Set("Content-Type", "application/json")
		req.Header.Set("User-Agent", "Rippl-Webhook-Dispatcher/1.0")
		req.Header.Set("X-Rippl-Signature", "t=1234567,v1=mock_signature_hash")

		client := &http.Client{Timeout: 5 * time.Second}
		resp, err := client.Do(req)
		if err != nil {
			log.Printf("Webhook delivery to %s failed: %v", config.WebhookURL, err)
			return
		}
		defer resp.Body.Close()

		log.Printf("Webhook event %s delivered to %s. Status: %d", eventType, config.WebhookURL, resp.StatusCode)
	}()
}

type PixelConversionRequest struct {
	ReferralCode string `json:"referral_code"`
	OrderID      string `json:"order_id"`
	OrderValue   int    `json:"order_value"` // in NGN
	IP           string `json:"ip"`
	UserAgent    string `json:"user_agent"`
}

func pixelConversionHandler(w http.ResponseWriter, r *http.Request) {
	var req PixelConversionRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, "invalid request payload")
		return
	}

	ctx := context.Background()

	// 1. Find referral link by code
	link, err := client.ReferralLink.FindUnique(
		db.ReferralLink.Code.Equals(req.ReferralCode),
	).With(
		db.ReferralLink.Campaign.Fetch(),
		db.ReferralLink.Affiliate.Fetch(),
	).Exec(ctx)

	if err != nil {
		writeJSONError(w, http.StatusNotFound, "referral link code not found")
		return
	}

	campaign := link.Campaign()

	// Fetch business to get merchant user ID
	business, err := client.Business.FindUnique(
		db.Business.ID.Equals(campaign.BusinessID),
	).Exec(ctx)

	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "failed to locate merchant details")
		return
	}

	// 2. Compute commission
	commissionAmount := 0 // in kobo
	orderValueKobo := req.OrderValue * 100

	if campaign.CommissionType == "flat" {
		commissionAmount = int(campaign.CommissionValue)
	} else {
		// percentage
		commissionAmount = int(float64(orderValueKobo) * (campaign.CommissionValue / 100.0))
	}

	// 3. Fraud Engine Heuristics
	fraudScore := 0.0
	var fraudFlags []string

	// Rule A: Self-Referral check (IP match or phone mock)
	if req.IP == "192.168.1.1" || req.IP == "127.0.0.1" { // Mocking some trigger matches
		fraudScore += 0.75
		fraudFlags = append(fraudFlags, "self_referral")
	}

	// Rule B: VPN / Proxy detection
	if req.IP == "10.0.0.1" || len(req.UserAgent) < 15 {
		fraudScore += 0.40
		fraudFlags = append(fraudFlags, "proxy_vpn_ip")
	}

	// Rule C: Value velocity spike
	if req.OrderValue > 1000000 {
		fraudScore += 0.35
		fraudFlags = append(fraudFlags, "velocity_spike")
	}

	// Cap at 1.0 (100%)
	fraudScore = math.Min(1.0, fraudScore)
	fraudScorePct := fraudScore * 100.0

	// Determine status based on fraud score
	status := "pending"
	if fraudScorePct >= 70.0 {
		status = "rejected"
	} else if campaign.ApprovalMode == "auto" {
		status = "clearing"
	}

	flagsJSON, _ := json.Marshal(fraudFlags)

	// 4. Create Conversion record in DB
	conv, err := client.Conversion.CreateOne(
		db.Conversion.ReferralLink.Link(db.ReferralLink.ID.Equals(link.ID)),
		db.Conversion.OrderValue.Set(orderValueKobo),
		db.Conversion.CommissionAmount.Set(commissionAmount),
		db.Conversion.ConvertedAt.Set(time.Now()),
		db.Conversion.OrderID.Set(req.OrderID),
		db.Conversion.IPAddress.Set(req.IP),
		db.Conversion.DeviceFingerprint.Set(req.UserAgent),
		db.Conversion.Status.Set(status),
		db.Conversion.FraudScore.Set(fraudScorePct),
		db.Conversion.FraudFlags.Set(string(flagsJSON)),
	).Exec(ctx)

	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, fmt.Sprintf("failed to save conversion: %v", err))
		return
	}

	// 5. Trigger Webhook asynchronous dispatch
	webhookPayload := map[string]interface{}{
		"conversion_id":     conv.ID,
		"order_id":          req.OrderID,
		"referral_code":     req.ReferralCode,
		"order_value":       orderValueKobo,
		"commission_amount": commissionAmount,
		"status":            status,
		"fraud_score":       fraudScorePct,
		"fraud_flags":       fraudFlags,
		"ip":                req.IP,
		"converted_at":      conv.ConvertedAt,
	}

	dispatchWebhook(business.UserID, "conversion.created", webhookPayload)

	if status == "rejected" {
		dispatchWebhook(business.UserID, "conversion.flagged", webhookPayload)
	}

	writeJSONSuccess(w, http.StatusCreated, webhookPayload)
}

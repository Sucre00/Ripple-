-- Clean up existing data if any to avoid unique key conflicts
DELETE FROM conversions;
DELETE FROM referral_links;
DELETE FROM campaigns;
DELETE FROM wallets;
DELETE FROM businesses;
DELETE FROM users;

-- Users (All passwords are "password123")
INSERT INTO users (id, email, phone, password_hash, role, status, kyc_tier, two_fa_secret, last_login_at, created_at, updated_at) VALUES
('affiliate-user-uuid-1111', 'affiliate@rippl.io', '+2348011111111', '$2a$10$Nd8Xzka12kthV/kvg7Mdo./6czWdHDJNA8E5H5QoubIivgk2cTyq6', 'affiliate', 'active', 'standard', NULL, NULL, '2026-07-19T13:30:00.000Z', '2026-07-19T13:30:00.000Z'),
('business-user-uuid-2222', 'merchant@rippl.io', '+2348022222222', '$2a$10$Nd8Xzka12kthV/kvg7Mdo./6czWdHDJNA8E5H5QoubIivgk2cTyq6', 'business_admin', 'active', 'enhanced', NULL, NULL, '2026-07-19T13:30:00.000Z', '2026-07-19T13:30:00.000Z'),
('superadmin-user-uuid-3333', 'admin@rippl.io', '+2348033333333', '$2a$10$Nd8Xzka12kthV/kvg7Mdo./6czWdHDJNA8E5H5QoubIivgk2cTyq6', 'super_admin', 'active', 'enhanced', NULL, NULL, '2026-07-19T13:30:00.000Z', '2026-07-19T13:30:00.000Z');

-- Businesses
INSERT INTO businesses (id, user_id, name, company_reg_number, created_at, updated_at) VALUES
('business-uuid-2222', 'business-user-uuid-2222', 'Kola Stores Ltd', 'RC 1928374', '2026-07-19T13:30:00.000Z', '2026-07-19T13:30:00.000Z');

-- Wallets
INSERT INTO wallets (id, owner_id, owner_type, pending_balance, clearing_balance, cleared_balance, total_earned, total_withdrawn, currency, version, updated_at) VALUES
('wallet-affiliate-1111', 'affiliate-user-uuid-1111', 'affiliate', 2500000, 1500000, 4200000, 8200000, 4000000, 'NGN', 0, '2026-07-19T13:30:00.000Z'),
('wallet-business-2222', 'business-uuid-2222', 'business', 0, 0, 42000000, 0, 0, 'NGN', 0, '2026-07-19T13:30:00.000Z');

-- Campaigns
INSERT INTO campaigns (id, business_id, name, status, commission_type, commission_value, commission_tiers, attribution_window_days, cookie_duration_days, approval_mode, target_url, budget_cap, starts_at, ends_at, deleted_at) VALUES
('campaign-uuid-9999', 'business-uuid-2222', 'Kola Midyear Referrals', 'active', 'percentage', 10.0, NULL, 30, 30, 'auto', 'https://kolastores.com/shop', NULL, '2026-07-19T13:30:00.000Z', NULL, NULL),
('campaign-uuid-zara', 'business-uuid-2222', 'Zara Footwear Launch', 'active', 'flat', 200000.0, NULL, 14, 30, 'manual', 'https://kolastores.com/zara', NULL, '2026-07-19T13:30:00.000Z', NULL, NULL);

-- Referral Links
INSERT INTO referral_links (id, code, campaign_id, affiliate_id, clicks, created_at) VALUES
('referral-link-uuid-8888', 'dwayne-stores', 'campaign-uuid-9999', 'affiliate-user-uuid-1111', 124, '2026-07-19T13:30:00.000Z');

-- Conversions
INSERT INTO conversions (id, referral_link_id, order_id, order_value, commission_amount, status, fraud_score, fraud_flags, ip_address, device_fingerprint, clearing_at, converted_at) VALUES
('conv-1', 'referral-link-uuid-8888', 'ORD-101', 2500000, 250000, 'pending', 0.0, NULL, '192.168.1.1', 'source=twitter&medium=social', NULL, '2026-07-19T10:00:00.000Z'),
('conv-2', 'referral-link-uuid-8888', 'ORD-102', 1500000, 150000, 'clearing', 0.0, NULL, '192.168.1.2', 'source=facebook&medium=social', '2026-07-20T12:00:00.000Z', '2026-07-19T11:00:00.000Z'),
('conv-3', 'referral-link-uuid-8888', 'ORD-103', 4000000, 400000, 'approved', 0.0, NULL, '192.168.1.3', 'source=direct&medium=none', NULL, '2026-07-19T12:00:00.000Z'),
('conv-4', 'referral-link-uuid-8888', 'ORD-104', 800000, 80000, 'rejected', 0.8, '["multiple_ips"]', '192.168.1.4', 'source=google&medium=cpc', NULL, '2026-07-19T13:00:00.000Z');

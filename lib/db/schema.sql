-- Users table (extends Whop user data)
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  whop_user_id TEXT UNIQUE NOT NULL,
  username TEXT NOT NULL,
  email TEXT,
  name TEXT,
  role TEXT DEFAULT 'editor' CHECK (role IN ('creator', 'editor', 'both')),
  stripe_account_id TEXT, -- For future payment integration
  total_jobs_created INTEGER DEFAULT 0,
  total_jobs_completed INTEGER DEFAULT 0,
  total_earnings DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id TEXT PRIMARY KEY,
  creator_id TEXT NOT NULL,
  editor_id TEXT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  bounty DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'CLAIMED', 'SUBMITTED', 'REVISION_REQUESTED', 'APPROVED', 'CANCELLED')),
  type TEXT CHECK (type IN ('short-form', 'long-form')),
  deadline TEXT,
  requirements JSONB, -- Array of requirement strings stored as JSON
  raw_footage_url TEXT,
  submission_url TEXT,
  revision_count INTEGER DEFAULT 0,
  revision_reason TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  claimed_at TIMESTAMP,
  submitted_at TIMESTAMP,
  approved_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (creator_id) REFERENCES users(id),
  FOREIGN KEY (editor_id) REFERENCES users(id)
);

-- Transactions table (for future payment integration)
CREATE TABLE IF NOT EXISTS transactions (
  id TEXT PRIMARY KEY,
  job_id TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('escrow_hold', 'payout', 'refund', 'platform_fee')),
  amount DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'failed')),
  stripe_transaction_id TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (job_id) REFERENCES jobs(id)
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  job_id TEXT,
  type TEXT NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (job_id) REFERENCES jobs(id)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_jobs_creator ON jobs(creator_id);
CREATE INDEX IF NOT EXISTS idx_jobs_editor ON jobs(editor_id);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read ON notifications(read);

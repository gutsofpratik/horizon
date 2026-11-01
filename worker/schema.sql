CREATE TABLE IF NOT EXISTS submissions (
 id TEXT PRIMARY KEY,
 kind TEXT NOT NULL CHECK(kind IN ('waitlist','contact')),
 email TEXT NOT NULL,
 name TEXT NOT NULL DEFAULT '',
 message TEXT NOT NULL DEFAULT '',
 role TEXT NOT NULL DEFAULT '',
 platform TEXT NOT NULL DEFAULT '',
 created_at TEXT NOT NULL,
 consent INTEGER NOT NULL DEFAULT 1
);
CREATE UNIQUE INDEX IF NOT EXISTS unique_waitlist_email ON submissions(email) WHERE kind='waitlist';
CREATE TABLE IF NOT EXISTS form_limits (key TEXT PRIMARY KEY,count INTEGER NOT NULL,expires_at INTEGER NOT NULL);

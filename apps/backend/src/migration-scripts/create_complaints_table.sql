CREATE TABLE IF NOT EXISTS complaint (
  id VARCHAR(36) PRIMARY KEY,
  customer_id VARCHAR(36) NOT NULL,
  order_id VARCHAR(36),
  order_number VARCHAR(255),
  description TEXT,
  status VARCHAR(50) DEFAULT 'open',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customer(id) ON DELETE CASCADE,
  FOREIGN KEY (order_id) REFERENCES order(id) ON DELETE SET NULL,
  INDEX idx_customer_id (customer_id),
  INDEX idx_status (status)
);

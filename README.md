# License Server for Microservices Manager

This open-source project provides a robust implementation of a **license server** designed to generate, validate, edit, and revoke software licenses for projects like **MicroManage** or other microservices management systems.

The server allows clients to:
- **Generate software licenses** based on user information, domain, and IP address.
- **Validate licenses** before allowing access to critical software functionality.
- **Edit licenses** (update domain, IP, or regenerate the license key).
- **Revoke licenses** when they are no longer valid.
- **Regenerate lost licenses** based on the associated domain.

## Features
- License generation using **JSON Web Tokens (JWT)**, ensuring secure, verifiable, and tamper-proof licenses.
- Validation of licenses against a central server, tied to specific **domains** and **IP addresses**.
- License edition (update the domain/IP and optionally regenerate the license key).
- License regeneration for clients who have lost their license key.
- Secure API calls with **LICENSE_SECRET** validation to prevent unauthorized access.
- License expiration system based on **timestamp**.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YuketsuSh/license-server.git
   cd license-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your license secret and MySQL credentials:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=your_db_name
   DB_USER=your_db_username
   DB_PASSWORD=your_db_password
   LICENSE_SECRET=your_super_secret_key
   PORT=3000
   ```

4. Run the server:
   ```bash
   npm start
   ```

## API Endpoints

### 1. License Generation
- **POST** `/generate`

  This endpoint generates a new license for a user, based on their domain and IP address.

  **Request Body:**
  ```json
  {
    "user": "client_name",
    "domain": "client-domain.com",
    "ipAddress": "your-server-ip",
    "licenseSecret": "your_license_secret"
  }
  ```

  **Response:**
  ```json
  {
    "licenseKey": "jwt_license_key"
  }
  ```

### 2. License Validation
- **POST** `/validate`

  This endpoint validates an existing license by checking the associated domain and IP address.

  **Request Body:**
  ```json
  {
    "licenseKey": "jwt_license_key",
    "domain": "client-domain.com",
    "ipAddress": "client-ip-server",
    "licenseSecret": "your_license_secret"
  }
  ```

  **Response (valid):**
  ```json
  {
    "valid": true,
    "message": "License is valid"
  }
  ```

  **Response (invalid):**
  ```json
  {
    "valid": false,
    "message": "License is invalid or domain/IP does not match"
  }
  ```

### 3. License Revocation
- **POST** `/revoke`

  This endpoint revokes an existing license, preventing it from being used in the future.

  **Request Body:**
  ```json
  {
    "licenseKey": "jwt_license_key",
    "licenseSecret": "your_license_secret"
  }
  ```

  **Response:**
  ```json
  {
    "message": "License was revoked successfully"
  }
  ```

### 4. List Licenses
- **GET** `/`

  This endpoint lists all licenses in the system.

  **Headers:**
  ```json
  {
    "x-license-secret": "your_license_secret"
  }
  ```

  **Response:**
  ```json
  [
    {
      "user": "client_name",
      "domain": "client-domain.com",
      "ipAddress": "client-ip-server",
      "licenseKey": "jwt_license_key"
    },
    "..."
  ]
  ```

### 5. License Edition
- **PUT** `/edit`

  This endpoint allows updating a license's domain, IP address, and optionally regenerating the license key.

  **Request Body:**
  ```json
  {
    "licenseKey": "existing_license_key",
    "newDomain": "newdomain.com",
    "newIpAddress": "192.168.1.10",
    "regenerateKey": true,
    "licenseSecret": "your_license_secret"
  }
  ```

  **Response:**
  ```json
  {
    "message": "License updated successfully",
    "licenseKey": "new_or_same_license_key",
    "domain": "newdomain.com",
    "ipAddress": "192.168.1.10"
  }
  ```

### 6. License Regeneration
- **POST** `/regenerate`

  This endpoint regenerates a new license key for an existing license using the domain as the search criterion.

  **Request Body:**
  ```json
  {
    "domain": "client-domain.com",
    "licenseSecret": "your_license_secret"
  }
  ```

  **Response:**
  ```json
  {
    "message": "License regenerated successfully",
    "newLicenseKey": "new_jwt_license_key"
  }
  ```

## Usage

This license server is designed for use in projects where software access must be restricted to valid license holders. Each license is tied to a **domain** and **IP address** to prevent unauthorized use. The system supports full license management, including **generation**, **validation**, **revocation**, **edition**, and **regeneration**.

## Security Considerations

- All API calls must include the **LICENSE_SECRET** either in the headers or request body. Calls without this secret are denied with a 403 error.
- Licenses are signed using **JWT** with the **LICENSE_SECRET**, ensuring they cannot be tampered with.
- Always use **HTTPS** to secure communication between your application and the license server to prevent data interception.

## Contributing

We welcome contributions! Feel free to open issues or submit pull requests to improve this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

# License Server for Microservices Manager

This open-source project provides a basic implementation of a **license server** designed to generate and validate software licenses for projects like **MicroManage** or other microservices management systems.

The server allows clients to:
- **Generate software licenses** based on user information, domain, and IP address.
- **Validate licenses** before allowing access to critical software functionality.

## Features
- License generation using **JSON Web Tokens (JWT)**.
- Validation of licenses against a central server.
- License tied to specific **domains** and **IP addresses** to prevent unauthorized usage.

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

3. Create a `.env` file with your license secret:
   ```env
   LICENSE_SECRET=your_super_secret_key
   PORT=3000
   ```

4. Run the server:
   ```bash
   npm start
   ```

## API Endpoints

### License Generation
- **POST** `/generate`  
  This endpoint generates a new license for a user, based on their domain and IP address.

  Example request body:
  ```json
  {
    "user": "client_name",
    "domain": "client-domain.com",
    "ipAddress": "195.154.172.105"
  }
  ```

  Example response:
  ```json
  {
    "licenseKey": "jwt_license_key"
  }
  ```

### License Validation
- **POST** `/validate`  
  This endpoint validates an existing license by checking the associated domain and IP address.

  Example request body:
  ```json
  {
    "licenseKey": "jwt_license_key",
    "domain": "client-domain.com",
    "ipAddress": "195.154.172.105"
  }
  ```

  Example response:
  ```json
  {
    "valid": true,
    "message": "License is valid"
  }
  ```

  If the license is invalid or mismatches the domain/IP address:
  ```json
  {
    "valid": false,
    "message": "License is invalid or domain/IP does not match"
  }
  ```

## Usage

This license server is intended to be used with applications that require license validation. A license is generated per client, and validated before allowing access to the protected software features.

## Security Considerations

**Keep the license secret (`LICENSE_SECRET`) private.** This secret is used to sign and verify all the licenses issued by the server.

## Contributing

We welcome contributions! Feel free to open issues or submit pull requests to improve this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
adjustments are needed.
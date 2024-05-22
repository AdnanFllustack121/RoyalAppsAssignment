# To set up the Task, please follow the instructions below:

### Step 1: Clone the repository
1. Clone the repository by running:
   ```
   git clone https://github.com/AdnanFllustack121/RoyalAppsAssignment.git
   ```
2. Add your Username and Git token when prompted to clone the repository.

### Step 2: Node and PHP versions
1. Ensure you have the following versions installed:
   - Node: v18.18.0
   - PHP: v8.1.2

### Step 3: Install Node modules and composer packages
1. Run the following commands to install dependencies:
   ```
   npm install
   composer install
   ```

### Step 4: Setting up the .env file
1. Create a .env file at the root of the file structure.
2. Copy the environment variables from the .env.example file into the newly created .env file.
3. Generate a key by running:
   ```
   php artisan key:generate
   ```

### Step 5: Start the application process
1. To initiate the application, run:
   ```
   php artisan serve
   ```
2. Additionally, run:
   ```
   npm run dev
   ```
3. View the application by using the below link:
   ```
   http://127.0.0.1:8000
   ```
# Clean installation commands

# 1. Remove existing node_modules and package-lock.json
rm -rf node_modules package-lock.json

# 2. Clear npm cache
npm cache clean --force

# 3. Install dependencies with React 18
npm install

# Alternative if you still get errors:
npm install --legacy-peer-deps

# Or force the installation:
npm install --force

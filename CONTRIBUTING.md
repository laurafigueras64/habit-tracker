# Contributing to Habit Tracker

Thank you for contributing to the Habit Tracker project! This guide outlines our branching system and contribution process to ensure smooth collaboration.

---

## Branching System

We use a Git branching model to manage our codebase efficiently. Below are the details of our branching system:

### 1. Main Branch
- **Branch name:** `main`
- Contains production-ready code.
- **Protected:** Only maintainers can merge after code reviews.

### 2. Development Branch
- **Branch name:** `dev`
- A staging area for features before they are merged into `main`.
- Developers should branch off from `dev` and merge back into `dev` after completing features.

### 3. Feature Branches
- **Branch name format:** `feature/<feature-name>`
- Used to develop specific features or enhancements.
- Always branch off from `dev`.

### 4. Hotfix Branches
- **Branch name format:** `hotfix/<hotfix-name>`
- Created for urgent bug fixes.
- Always branch off from `main` and merge back into `main` and `dev`.

### 5. Workflow
- **To add a feature:**
  1. Create a new branch from `dev`.
  2. Work on the feature.
  3. Submit a pull request to merge into `dev`.
- **To release:**
  1. Merge `dev` into `main` after testing and review.

### 6. Branch Naming Rules
- Use lowercase and hyphens (`-`) to separate words.
- Be descriptive: `feature/user-authentication` is better than `feature/auth`.

---

## How to Contribute

### 1. Fork the Repository
- Create a personal copy of the repository by clicking the "Fork" button on the repository page.
- Clone your forked repository to your local machine using your preferred Git tool or command line.

### 2. Create a Branch
- Create a new branch for your feature or fix. Use a descriptive branch name, such as:
  - `feature/add-notifications`
  - `docs/update-readme`

### 3. Make Changes
- Make the necessary changes to the code or documentation in your local copy.

### 4. Commit and Push
- Save your changes and ensure you have meaningful commit messages explaining your updates.
- Push your branch to your forked repository.

### 5. Submit a Pull Request
- Go to the original repository on GitHub.
- Open the "Pull Requests" tab and click "New Pull Request."
- Select your branch from your forked repository as the source.
- Add a clear title and description for your pull request, then submit it.

---

Thank you for contributing! If you have any questions or need assistance, feel free to reach out.

# Git: Merge vs Rebase vs Pull vs Fetch

## 1. `git fetch` vs `git pull`
- **`git fetch`**: Downloads all new data from the remote repository to your local machine, but doesn't change your working branch. It only updates the remote-tracking branches (e.g., `origin/main`).
- **`git pull`**: Essentially runs `git fetch` and then immediately `git merge` the fetched branch into your current branch. It updates your local code directly.
- **Rule of Thumb**: Use `fetch` if you want to see what others have done before deciding to merge. Use `pull` when you are sure you want to integrate their changes immediately.

## 2. `git merge` vs `git rebase`
Both are used to integrate changes from one branch into another, but they do it in different ways.

### `git merge`
- Combines the histories of two branches into a single new commit (the "merge commit").
- **Pros**: Preserves the original project history as it was created; non-destructive.
- **Cons**: Can lead to a messy project history with many merge commits if done frequently.

### `git rebase`
- Takes the changes from one branch and applies them on top of another branch. It essentially rewrites the history.
- **Pros**: Results in a clean, linear project history.
- **Cons**: Rewriting history can be dangerous on public/shared branches! Never rebase a branch that others are working on.

## 3. Merging Strategies
- **Fast-forward**: If the target branch has no new commits, Git just moves the pointer forward.
- **Recursive (3-way merge)**: Used when branches have diverged. Git finds a common ancestor and creates a new merge commit.

## 4. Useful Git Commands
- `git stash`: Temporarily "stashes" changes so you can switch branches without committing.
- `git cherry-pick <commit>`: Applies a specific commit from one branch to another.
- `git revert <commit>`: Creates a new commit that reverses the changes of a previous commit (safer than resetting).
- `git reset --hard <commit>`: Resets your current branch and working directory to a specific commit (dangerous, data loss possible!).

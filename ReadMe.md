# Git Workflow: Frontend MVP to Backend Development

This project uses a structured Git workflow to manage transitions between major phases of development. Below is a summary of the process followed:

---

## 🔖 Tagging the Frontend MVP

Once the frontend was completed and the site was able to fulfill its main purpose without any backend, a Git tag was created to mark this stable state:

```bash
git tag -a frontend-mvp -m "Have 4 stable questions; users can take these questions with ease"
git push origin frontend-mvp





  ## 🌿 Starting Backend Work on a New Branch

A new Git branch was created to begin backend development separately from the stable
git checkout -b pascal-backend
git push origin pascal-backend
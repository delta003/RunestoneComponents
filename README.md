# Petlja customized RunestoneComponents

Components are customized on demand, meaning we'll customize only needed components.

List of Petlja customized components (including new components):
- activecode
- mchoice
- dragndrop
- fillintheblank
- parsonsprob
- karel (new)
- infonote (new)
- questionnote (new)

List of unsuppored Runestone components:
- note (use infonote instead)

## Requesting a new component or customization of some not yet customized component
Just submit an issue in this repo.

## Switching to Petlja Runestone
- If you already have runestone, remove it with `pip uninstall runestone`
- Clone this repository
- From repository folder, run `pip install -e .`
- If you're migrating existing project, you'll have to replays `_templates` folder in your Runestone project with `runestone/common/project_template/_templates` folder from this repo (also check for usage of unsuppored components)
- Use `runestone` like before
- To update, do `git pull` in repository (we do NOT guarantee that master branch will always work, so please reach out to `markobakovic95@gmail.com` or `v-srbozo@microsoft.com` before updating)


# CottonSchemas

#### Main repository for Cotton related JSON schemas

---
## Link to SharePoint Project

* [SharePoint](https://theseam2.sharepoint.com/sites/cta/Shared%20Documents/Forms/AllItems.aspx?viewpath=%2Fsites%2Fcta%2FShared%20Documents%2FForms%2FAllItems.aspx)

## Quick Note before beginning

* Below are instruction for working with Git repositories from the command line. For those who would rather use a GUI for pull/push/merge, there are plent options available - see below for an abbreviated list.  The process will work the same, but for executing each step, check the GUI client's documentation for help.
  * [SourceTree](https://www.sourcetreeapp.com/)
  * [GitHub Desktop](https://desktop.github.com/)
  * [TortoiseGit](https://tortoisegit.org/) - windows only.
  * [GitKraken](https://www.gitkraken.com/)
  * See [here](https://git-scm.com/download/gui/windows) for a more complete list.

---

## To begin collaboration

### Clone the repository

---

* Fork this repository by clicking **Fork** in the upper right corner.
  * This will create a copy of the current repository under your github user account.
* Clone the forked repository
  * To get the cloned repository URL, click the **Clone or Download** button. An example (**NOTE**: be sure to replace _myusername_ with your github account name): ```git clone https://github.com/myusername/CottonSchemas.git```

### Merging changes from your repository to the main repository (CottonTechnology/CottonSchemas)

---

#### Create pull request

* Be sure the desired changes have been committed to your GitHub accounts forked repository:
  * First, make any changes you deem appropriate.
  * ```git add .``` - tells Git to track all your changes.
  * ```git commit -m 'Your message'``` - commits changes to your local repository.
  * ```git push -u origin master``` - pushes changes to the remote repository under your GitHub user account.
* In GitHub, go to your account's **CottonSchemas** repository, choose the tab labeled **Pull Requests** and click the **New pull request** button in the right-corner of the tab.
* Select and review your changes, then click **Create pull request** to finalize.

#### Merge pull request into **CottonTechnologyAlliance/CottonSchemas** repository

* See [GitHub Reference](https://help.github.com/articles/merging-a-pull-request/) for specifics.
* If you are a member of the organization repository, then click the **Pull requests** tab.
* Choose the pull request you would like to merge.
* Select **Merge pull request** and click **Confirm Merge**.

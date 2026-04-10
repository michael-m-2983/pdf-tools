<div style="text-align: center;">
    <img width="70" src="./public/logo.svg" />
</div>

# pdf-tools

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/michael-m-2983/pdf-tools/deploy.yml)
![GitHub Release](https://img.shields.io/github/v/release/michael-m-2983/pdf-tools)


A simple web application for applying preset transformations on PDF files.

## Usage

1. Visit <https://michael-m-2983.github.io/pdf-tools/>.
2. Select a PDF file
3. Select which action you want to perform on the file from the dropdown menu.
4. Download the result

## Setup

```sh
# First, install NPM: https://nodejs.org/en/download/

# Clone the repository from GitHub
git clone https://github.com/michael-m-2983/pdf-tools.git
cd pdf-tools/

# Install libraries
npm install

# Start a local development server
npm run dev
```

### Build configurations

You can tell vite to build the project in one of three modes: `normal`, `github-pages`, or `offline-html`. Do this by setting the `BUILD_MODE` environment variable to your choice of build mode.

| Mode           | Description                                                                                                                                         |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `normal`       | Builds the application like normal.                                                                                                                 |
| `github-pages` | Builds the application but with a custom base path '/pdf-tools' for github pages.                                                                   |
| `offline-html` | Builds the application into a single html file with [vite-plugin-singlefile](https://www.npmjs.com/package/vite-plugin-singlefile) for portability. |

```bash
# Command examples
BUILD_MODE=normal       npm run build
BUILD_MODE=github-pages npm run build
BUILD_MODE=offline-html npm run build
```

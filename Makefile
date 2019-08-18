# Makefile for Sphinx documentation
#

# You can set these variables from the command line.
SPHINXOPTS    =
SPHINXBUILD   = sphinx-build
PAPER         =
BUILDDIR      = build

GITHUB_PAGES_BRANCH=master

CNAME=www.scipyla.org

# User-friendly check for sphinx-build
ifeq ($(shell which $(SPHINXBUILD) >/dev/null 2>&1; echo $$?), 1)
$(error The '$(SPHINXBUILD)' command was not found. Make sure you have Sphinx installed, then set the SPHINXBUILD environment variable to point to the full path of the '$(SPHINXBUILD)' executable. Alternatively you can add the directory with the executable to your PATH. If you don't have Sphinx installed, grab it from http://sphinx-doc.org/)
endif

# Internal variables.
PAPEROPT_a4     = -D latex_paper_size=a4
PAPEROPT_letter = -D latex_paper_size=letter
ALLSPHINXOPTS   = -d $(BUILDDIR)/doctrees $(PAPEROPT_$(PAPER)) $(SPHINXOPTS) source
SPHINXOPTS_ES   = -d $(BUILDDIR)/doctrees $(SPHINXOPTS) -Dlanguage='es' source
SPHINXOPTS_PT   = -d $(BUILDDIR)/doctrees $(SPHINXOPTS) -Dlanguage='pt' source
# the i18n builder cannot share the environment and doctrees with the others
I18NSPHINXOPTS  = $(PAPEROPT_$(PAPER)) $(SPHINXOPTS) source

.PHONY: help clean html serve dirhtml singlehtml pickle json htmlhelp qthelp devhelp epub latex latexpdf text man changes linkcheck doctest gettext

help:
	@echo "Please use \`make <target>' where <target> is one of"
	@echo "  html       to make standalone HTML files"
	@echo "  view       to make html and view on default browser if is already serving"
	@echo "  gettext    to make PO message catalogs"
	@echo "  changes    to make an overview of all changed/added/deprecated items"
	@echo "  linkcheck  to check all external links for integrity"

clean:
	rm -rf $(BUILDDIR)/*

html:
	sphinx-intl build -d source/
	$(SPHINXBUILD) -b html $(SPHINXOPTS_ES) $(BUILDDIR)/html/es
	$(SPHINXBUILD) -b html $(SPHINXOPTS_PT) $(BUILDDIR)/html/pt
	cp source/index.html $(BUILDDIR)/html
	cp README.md $(BUILDDIR)/html
	mkdir -p $(BUILDDIR)/html/conf && cp -R confs_archive/* $(BUILDDIR)/html/conf
	@echo
	@echo "Build finished. The website is in $(BUILDDIR)/html."

view:
	python -c "import webbrowser;webbrowser.open('build/html/index.html')"

gettext:
	$(SPHINXBUILD) -b gettext $(I18NSPHINXOPTS) $(BUILDDIR)/locale
	@echo
	@echo "Build finished. The message catalogs are in $(BUILDDIR)/locale."

changes:
	$(SPHINXBUILD) -b changes $(ALLSPHINXOPTS) $(BUILDDIR)/changes
	@echo
	@echo "The overview file is in $(BUILDDIR)/changes."

linkcheck:
	$(SPHINXBUILD) -b linkcheck $(ALLSPHINXOPTS) $(BUILDDIR)/linkcheck
	@echo
	@echo "Link check complete; look for any errors in the above output " \
	      "or in $(BUILDDIR)/linkcheck/output.txt."

publish: html
	ghp-import -m "Generate ScipyLaTam site" -b $(GITHUB_PAGES_BRANCH) $(BUILDDIR)/html -c ${CNAME}
	git add -A .
	git push
	git push -u --force origin $(GITHUB_PAGES_BRANCH)

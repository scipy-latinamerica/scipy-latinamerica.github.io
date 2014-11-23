#!/usr/bin/env python
# -*- coding: utf-8 -*-

from __future__ import unicode_literals


# resStructuredtext substitusions (also available on templates)
SUBSTITUTIONS = {

    # python
    "PYTHON": 'http://python.org/',
    "PYTHON_DOCS": u'https://docs.python.org',

    # scipy
    "SCIPY": 'http://scipy.org',

    # scipy la
    "SCIPY_LA": 'SciPy Latin America',
    "SCIPYLA_FORUM": 'https://groups.google.com/forum/#!forum/scipyla',

}


# How Many news must show on sidebar
TOTAL_NEWS = 30


# How many news from avery author will be retrieved to create the news sidebar
NEWS_FOR_FEED = 4


# Twitter acoounts for generate the RSS feed for the sidebar
TWITTER = (
    # Generic Python
     "@ThePSF", "@gvanrossum", "@planetpython",

    # Generic Conferences, Communities and Companies
    "@pycon", "@europython", "@PythonArgentina", "@pythonbrasil",
    "@pyladiesARG", "@pyladies", "@PyLadies_ES", "@PyLadiesBrazil",
    "@apyb", "@PyConVE", "@python_es", "@PyConES",

    # Generic Scipy
    "@pybonacci", "@SciPyTip", "@fperez_org", "@SciPyTip", "@GaelVaroquaux",

    # Scipy Conferences, Communities and Companies
    "@PyDataConf", "@ContinuumIO", "@enthought", "@AstroPython", "@SciPyConf",
    "@EuroSciPy", "@SciPyData_ES", "@IMATHRESEARCH ",

    # Scipy Pojects
    "@astropy",  "@scikit_learn", "@ProjectJupyter", "@BokehPlots",
    "@matplotlib", "@SymPy", "@DailyNumpy", "@Biopython", "@IPythonDev",
    "@NotebooksBoom", "@NLTK_org", "@muricoca_crab",

    # Misc Science
    "@JuliaLanguage", "@StatFact", "@NetworkFact", "@ScienceTip", "@diff_eq",
    "@UnitFact", "@MedVocab", "@DailySymbol", "@CompSciFact", "@AlgebraFact",
    "@ProbFact", "@AnalysisFact", "@TopologyFact", "@TeXtip", "@ProbFact",
    "@GnuOctave", "@analyticbridge", "@StatsBlogs", "@hadoop", "@ApacheSpark",
    "@ApacheMahout", "@TheASF",

)

GOOGLE_NEWS_SEARCH_TERMS = (
    "scipy", "pydata", "science"
)

# Another rss
RSS = (
)

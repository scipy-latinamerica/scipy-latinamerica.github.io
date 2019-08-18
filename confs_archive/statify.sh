wget -U "Mozilla/5.0 (X11; U; Linux; en-US; rv:1.9.1.16) Gecko/20110929 Firefox/3.5.16" \
    --recursive --level=3 --no-clobber --page-requisites --html-extension \
    --convert-links --no-parent \
    --wait=3 --random-wait \
    http://conf.scipyla.org --domains=conf.scipyla.org


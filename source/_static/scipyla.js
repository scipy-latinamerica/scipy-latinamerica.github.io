$(document).ready(function(){

    var ENTRY_TEMPLATE = '<div data-date="{date}" class="list-group-item">{title} <a target="_blank" href="{url}">View More</a> <p><small>{date}</small></p></div>';

    var sort_feeds = function(){
        load_feeds++;
        if(load_feeds == rss.length){
            var $items = $("#news .list-group-item");
            $("#news > ul").remove();
            $("#news").append(
                $items.tsort(
                    {data:'date', order: 'desc'}
                ).slice(0, TOTAL_NEWS)
            );
            $("#news_loading").remove();
            $("#news").removeClass("hidden");
        }
    }

    if($("#news").length){
        var load_feeds = 0;
        for(var idx=0; idx < rss.length; idx++){
            var news_for_feed = rss[idx][0];
            var feed = rss[idx][1];
            var conf = {
                    limit: news_for_feed,
                    entryTemplate: ENTRY_TEMPLATE,
                    success: sort_feeds
            };
            $("#news").rss(feed, conf).show();
        }
    }


});

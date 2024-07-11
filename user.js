/* global user_pref */
// semcolon and no line wrap must be turned on

// vpn ads
user_pref('browser.privatebrowsing.vpnpromourl', '');
user_pref('browser.vpn_promo.enabled', false);

// extension ads
user_pref('extensions.getAddons.showPane', false);
user_pref('extensions.htmlaboutaddons.recommendations.enabled', false);
user_pref('browser.discovery.enabled', false);
user_pref('browser.newtabpage.activity-stream.asrouter.userprefs.cfr.addons', false);
user_pref('browser.newtabpage.activity-stream.asrouter.userprefs.cfr.features', false);

// about:config warning
user_pref('browser.aboutConfig.showWarning', false);

// compact mode for more tiny density
user_pref('browser.compactmode.show', true);
user_pref('browser.uidensity', 1); // compact

// cookie banner
// 1: reject all if it's one click
user_pref('cookiebanners.service.mode', 1);
user_pref('cookiebanners.service.mode.privateBrowsing', 1);

// WHY ISN'T IT DEFAULT
user_pref('browser.urlbar.suggest.calculator', true);
user_pref('browser.urlbar.unitConversion.enabled', true);

// trending search
user_pref('browser.urlbar.trending.featureGate', false);
user_pref('browser.urlbar.suggest.trending', false);

// new tab pages
user_pref('browser.newtabpage.activity-stream.feeds.topsites', false);
user_pref('browser.newtabpage.activity-stream.feeds.section.topstories', false);
user_pref('browser.newtabpage.activity-stream.showSponsoredTopSites', false);

// pocket
user_pref('extensions.pocket.enabled', false);

// highlight all on page search
user_pref('findbar.highlightAll', true);

// alt to open menu
user_pref('ui.key.menuAccessKeyFocuses', false);

// middle click paste
user_pref('middlemouse.paste', false);
user_pref('browser.tabs.searchclipboardfor.middleclick', false);

// mousebutton disable
user_pref('mousebutton.4th.enabled', false);
user_pref('mousebutton.5th.enabled', false);

// show user agent styles in devtool
user_pref('devtools.inspector.showUserAgentStyles', true);

// minimum tab width
user_pref('browser.tabs.tabMinWidth', 120);

// canvas 2d tweaks
user_pref('gfx.canvas.accelerated.cache-items', 4096);
user_pref('gfx.canvas.accelerated.cache-size', 512);
user_pref('gfx.content.skia-font-cache-size', 20);

// compression level for cached javascript bytecode
// 0: don't
// 1: minimal
// 9: maximal
user_pref('browser.cache.jsbc_compression_level', 3);

// media cache
user_pref('media.memory_cache_max_size', 65536);
user_pref('media.cache_readahead_limit', 7200);
user_pref('media.cache_resume_threshold', 3600);

// image cache
user_pref('image.mem.decode_bytes_at_a_time', 32768);

// network connections
user_pref('network.http.max-connections', 1800);
user_pref('network.http.max-persistent-connections-per-server', 10);
user_pref('network.http.max-urgent-start-excessive-connections-per-host', 5);

// > If you have a fast machine and internet connection, disabling pacing
// > may provide a small speed boost when loading pages with lots of requests.
user_pref('network.http.pacing.requests.enabled', false);

// more TLS token caching for fast reconnects
user_pref('network.ssl_tokens_cache_capacity', 10240);

// content block: strict
user_pref('browser.contentblocking.category', 'strict');

// same site none requires secure context
user_pref('network.cookie.sameSite.noneRequiresSecure', true);

// DNT
user_pref('privacy.globalprivacycontrol.enabled', true);

// use CRLite instead of OCSP
user_pref('security.OCSP.enabled', 0); // disabled
user_pref('security.remote_settings.crlite_filters.enabled', true);
user_pref('security.pki.crlite_mode', 2); // check TLS, don't fall to OCSP

// TLS safe renegotiation
user_pref('security.ssl.treat_unsafe_negotiation_as_broken', true);
user_pref('security.ssl.require_safe_negotiation', true);

// more information for bad TLS cert
user_pref('browser.xul.error_pages.expert_bad_cert', true);

// display "Not Secure" text on HTTP sites
user_pref('security.insecure_connection_text.enabled', true);
user_pref('security.insecure_connection_text.pbmode.enabled', true);

// option to add custom search engine
user_pref('browser.urlbar.update2.engineAliasRefresh', true);

// sponsored suggest
user_pref('browser.urlbar.suggest.quicksuggest.sponsored', false);
user_pref('browser.urlbar.suggest.quicksuggest.nonsponsored', false);

// punycode
user_pref('network.IDN_show_punycode', true);

// https-only mode
user_pref('dom.security.https_only_mode', true);
user_pref('dom.security.https_only_mode_error_page_user_suggestions', true);

// DoH
user_pref('network.trr.mode', 2); // DoH + fallback
user_pref('network.trr.max-fails', 5);
user_pref('network.trr.uri', 'https://mozilla.cloudflare-dns.com/dns-query');

// remembering passwords
user_pref('signon.rememberSignons', false);
user_pref('extensions.formautofill.addresses.enabled', false);
user_pref('extensions.formautofill.creditCards.enabled', false);

// prevent password truncation
user_pref('editor.truncate_user_pastes', false);

// 1=don't allow cross-origin sub-resources to open HTTP authentication credentials dialogs
user_pref('network.auth.subresource-http-auth-allow', 1);

// pdfjs scripting
user_pref('pdfjs.enableScripting', false);

// bypassing 3rd party extension install prompts is available by default wtf is wrong in mozilla
user_pref('extensions.postDownloadThirdPartyPrompt', false);

// referrer trimming
// 2: scheme+host+port only
user_pref('network.http.referer.XOriginTrimmingPolicy', 2);

// Container tab
user_pref('privacy.userContext.enabled', true);
user_pref('privacy.userContext.ui.enabled', true);

// Firefox View
user_pref('browser.tabs.firefox-view', false);
user_pref('browser.tabs.firefox-view-next', false);
user_pref('browser.tabs.firefox-view-newIcon', false);

// permissions
user_pref('permissions.default.geo', 2); // geo - block
user_pref('permissions.default.xr', 2); // xr - block

// geo region caching
user_pref('browser.region.update.enabled', false);

// captive portal
user_pref('captivedetect.canonicalURL', '');
user_pref('network.captive-portal-service.enabled', false);

// restore previous browser sessionuser_pref('browser.startup.page', 3)

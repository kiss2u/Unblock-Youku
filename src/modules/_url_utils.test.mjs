import {urls2pac} from './_url_utils.mjs';

// urlWhitelist, urlList,
//     proxyProtocol1, proxyAddress1,
//     proxyProtocol2, proxyAddress2) {

const TEST_PROXY_PROTOCOL_1 = 'HTTPS';
const TEST_PROXY_ADDRESS_1 = 'proxy.example.com';
const TEST_PROXY_PROTOCOL_2 = 'https';
const TEST_PROXY_ADDRESS_2 = '1.2.3.4';


const TEST_BYPASS_URL_LIST = [
  'http://bangumi.bilibili.com/index/ding-count.json',
];

const TEST_URL_LIST = [
  'http://*/*',
  'https://*/*',
  'http://*.video.qq.com/*',
  'https://*.video.qq.com/*',
  'http://vd.l.qq.com/*',
  'https://vd.l.qq.com/*',
  'http://example.com',
  'https://example.com',
  'http://example.com/',
  'https://example.com/',
  'http://*.example.com/*',
  'https://*.example.com/*',
  'http://*.example.com/path.json?aaa=bbb',
  'https://*.example.com/path.json?aaa=bbb',
  'http://*.example.com/path.json?aaa=bbb*',
  'https://*.example.com/path.json?aaa=bbb*',
  'http://122.72.82.31/*',
];

const EXPECTED_PAC_CONTENT = [
  'var _http_map = {',
  '  \'white\': {',
  '    \'any\': [],',
  '    \'bangumi.bilibili.com\': [',
  '      /^\\/index\\/ding\\-count\\.json$/i',
  '    ]',
  '  },',
  '  \'proxy\': {',
  '    \'any\': [',
  '      /^[^/]*\\//i,',
  '      /^[^/]*\\.video\\.qq\\.com\\//i,',
  '      /^[^/]*\\.example\\.com\\//i,',
  '      /^[^/]*\\.example\\.com\\/path\\.json\\?aaa=bbb$/i,',
  '      /^[^/]*\\.example\\.com\\/path\\.json\\?aaa=bbb/i',
  '    ],',
  '    \'vd.l.qq.com\': [',
  '      /^\\//i',
  '    ],',
  '    \'example.com\': [',
  '      /^\\/$/i,',
  '      /^\\/$/i',
  '    ],',
  '    \'122.72.82.31\': [',
  '      /^\\//i',
  '    ]',
  '  }',
  '};',
  'var _https_map = {',
  '  \'white\': {',
  '    \'any\': []',
  '  },',
  '  \'proxy\': {',
  '    \'any\': [',
  '      /^[^/]*\\//i,',
  '      /^[^/]*\\.video\\.qq\\.com\\//i,',
  '      /^[^/]*\\.example\\.com\\//i,',
  '      /^[^/]*\\.example\\.com\\/path\\.json\\?aaa=bbb$/i,',
  '      /^[^/]*\\.example\\.com\\/path\\.json\\?aaa=bbb/i',
  '    ],',
  '    \'vd.l.qq.com\': [',
  '      /^\\//i',
  '    ],',
  '    \'example.com\': [',
  '      /^\\/$/i,',
  '      /^\\/$/i',
  '    ]',
  '  }',
  '};',
  'var _proxy_str = \'HTTPS proxy.example.com; HTTPS 1.2.3.4; DIRECT;\';',
  '',
  'function _check_regex_list(regex_list, str) {',
  '  if (str.slice(0, 4) === \':80/\')',
  '    str = str.slice(3);',
  '  for (var i = 0; i < regex_list.length; i++)',
  '    if (regex_list[i].test(str))',
  '      return true;',
  '  return false;',
  '}',
  '',
  'function _check_patterns(patterns, hostname, full_url, prot_len) {',
  '  if (patterns.hasOwnProperty(hostname))',
  '    if (_check_regex_list(patterns[hostname],',
  '        full_url.slice(prot_len + hostname.length)))',
  '      return true;',
  '  if (_check_regex_list(patterns.any,',
  '      full_url.slice(prot_len)))',
  '    return true;',
  '  return false;',
  '}',
  '',
  'function _find_proxy(url_map, host, url, prot_len) {',
  '  if (_check_patterns(url_map.white, host, url, prot_len))',
  '      return \'DIRECT\';',
  '  if (_check_patterns(url_map.proxy, host, url, prot_len))',
  '    return _proxy_str;',
  '  return \'DIRECT\';',
  '}',
  '',
  'function FindProxyForURL(url, host) {',
  '  var prot = url.slice(0, 6);',
  '  if (prot === \'http:/\')',
  '    return _find_proxy(_http_map, host, url, 7);',
  '  else if (prot === \'https:\')',
  '    return _find_proxy(_https_map, host, url, 8);',
  '  return \'DIRECT\';',
  '}',
].join('\n') + '\n';


test('Should produce the expected PAC content', () => {
  expect(urls2pac(
      TEST_BYPASS_URL_LIST, TEST_URL_LIST,
      TEST_PROXY_PROTOCOL_1, TEST_PROXY_ADDRESS_1,
      TEST_PROXY_PROTOCOL_2, TEST_PROXY_ADDRESS_2)).toMatch(EXPECTED_PAC_CONTENT);
});

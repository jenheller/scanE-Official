// GLOBAL VARIABLES //

// LOG DEBUG SWITCHES //

const dev = false, dbg = false, dCl = false, dBd = false;

// CACHED API KEY //

var __SAPLING_KEY = null;

// REGEX PATTERNS //

var CH_EJ = /(?![®©™])[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu;
var CH_EJV = /📧|\u{1F4E7}|📩|\u{1F4E9}/u;
var CH_EMD = /—|[\u{2014}\u{2012}]/gui;
var CH_EPS = /\b(?:(?:\. ?){3}|…)\b/g;
var CH_MS = /mailsuite|\bmailtrack\b/i;
var CH_N1 = /(?:1|I|i)\b/;
var CH_PHE = /[^\s][!?\.]$/;
var CH_WS = /wisestamp|create\syour\sown\semail\ssignature/i;
var CL_AD = /\b(?:S(?:[Tt][Ee]?|tree|ui)t?e?|A[Vv][Ee]?(?:nue)?|R(?:oa)?[Dd]|D[Rr](?:ive)?|B(?:ou)?[Ll]?e?[Vv](?:ar)?[Dd]|H(?:igh)?[Ww]a?[Yy]|Way|La?[Nn]e?|C(?:our)?[Tt]|Pi?[Kk]e?|C[Ii][Rr](?:cle)?|(?:T|P[Ll]a?)(?:ERR?|err?|[Cc][Ee]?)?|(?:P\.? *[Oo]\.? *)?[Bb](?:OX|ox) *\d+|A[Pp](?:ar)?[Tt](?:ment)?|Fl(?:oor)?|Unit)\.?\b/;
var CL_AD2 = /^[\w+\. ],? [A-Z]{2},? [\d\-]{5,10}$/;
var CL_AFT = /-->|<!?--|→|^\s*>\s*$|\[[^\[\]]+?\]|\b96\b|=\s?\d\s?\?|ADVERTISEMENT|SPONSOR(?:ED|)|\|\n|\s*\*{2,}\s*|image\svia.*?$|##[\d\w]+##|[A-Z_]{5,}:\s*(True|False|None|Null|[0-9]+)/gm;
var CL_ATT = /^(?:class|src|title|id|alt|data|target|border|role|xmlns|lang|meta|content|contenteditable|spellcheck|type|width|height|tabindex|dir|translated|bell|mt|start|bgcolor|draggable|name|item\w{3,5}|(?:data|sculpt|aria)-[\w\-]+|(?:col|row)span|cell-(?:padding|spacing)|(?:background|font)-(?:color|face)|(?:h|v|)(?:space|align)|oid|label|datatype|comboservice|unselectable|x-em-[a-z]+?|\/?[wo]:|meta)$/i;
var CL_CPS = /[\t ]+/g;
var CL_DSH = /^[-=]+$/gm;
var CL_FR = /unsubscribe|(?:no\s*longer|)\s*(?:would|want|wish|need)\s*(?:like\s*|)(?:stop|change)\s*(?:show\syou|to|your\ssubcription)\s*(?:receive?(?:ing)?|(?:be\s*|)removed|remove\s*yourself)|advertise\s*(?:on|with)/i;
var CL_FRB = /(?:(?:mem|subsci|read)b?er|pay)[\s\-](?:only|(?:wall|support)ed)|(?:pledg|donat)(?:ing|e|ion)\b|(?:keep|continue|read|view|see)\s(?:more|full\sstory|reading)|(?:you(?:\sare|[’']re)\scurrently)|(?:become?(?:ing)?\s*an?\s*(?:free\s*(?:or\s*(?:paid|paying))?|(?:[\w\p{P} ]+))?\s*(?:member|subscriber\b))|buy\sme\sa\scoffee|support\s(?:us|me|(?:our|my)\swork)|(?:for(?:\sthe|)(?:\sfull|complete|)\s(?:experience|access)|if\syou).*?\supgrade\b|add\s*(?:your)?\spostal\saddress\shere|web\s*version/ui;
var CL_FRC = /(?:did\snot|didn[’']t)\s(?:authorize|atpt|req|grant|access|allow|make)|\bdo\snot\s(?:respond|reply)|no[-\s]reply|(?:not\s|un)(?:monitor|attend)ed|void\swhere\sprohibited|no\scash\svalue|not\scombinable|(?:about|check\sout|connect|download|chat|reach\sout)\s?(?:with|the|our|to|)\s?(?:new\s|)(?:us|help|support|(?:mobile\s|)app\b|web[ -]?(?:site|page))|free\s(?:trial|membership|subscription|month|post|article|account|sample|gift)|(?:secure|change|reset|(?:re|)view|manage|adjust|modify|update|\bedit)\s(?:your|the|my|)\s?(?:account|communications?|notifications?|subscription|membership|profile|security|password|(?:email\s|)preferences?|settings|options|activity)|(?:you\s*(?:[’']ve|have|are|)\s*(?:(?:receiv|got)(?:ed|ing))|forwarded|was\s*(?:this|these)\s*(?:electronic\smessage\s|)(?:email|message|notification|notice|transmission|communication)s?\s*(?:because|is|was|(?:may\s*|)contains?|forwarded\sto\syou|in\serror))|offer\s(?:only|)\s?valid|not\scombinable|cannot\sbe\scombined|fees\s(?:may|)\s?apply|use\sthereof|\Bterms\s(?:of|and|&)\s(?:use|sale|conditions)|(?:privacy|confidentiality)\s*(?:and|&)?\s*(?:policy|notice|statement|practices|(?:and|&)\ssecurity)|(named|intended)\s*(?:(?:only\s)?for|recipient|to\s*be(?:\s*for|))/i;
var CL_HFF = /forward(?:ed|)\sthis\s(?:to\syou|)\s?(?:message|email|post|newsletter|article)/i;
var CL_HR = /(?:view|read|see|open)\s(?:this|)\s?(?:email|post|article|message|web|in)\s?(?:[oi]n|as|)\s?(?:the|a|)[\s\-](?:line|app|web|version|browser)|web\s*version/i;
var CL_LKI = /\[([\w \p{P}]+?)\]\((?:https?:\/\/|mailto:|\??utm_)[\w\d\p{P}\s=]+?\)/gui;
var CL_LKP = /(?:^[\w ]+:\s*|)([\(\[<])\s*(?:(?:a|link)\s\w+="|)https?:\/\/[^\1\2]+?\s*([>\]\)])/gim;
var CL_LKS = /https?:\/\/[^<>\]\(\s]+?(?:([<\s])|$)/gim;
var CL_LLN = /(?!\b\d{1,2}\.\s)(?:©|[Cc]opyright|\(c\)|\u{00A9}|(?:[Rr]egistered\s*)?(?:[Ss]ervice\s*|[Tt]rade)mark|™|\u{2122}|not\s*affiliated|[Rr]ights\s[Rr]eserved|[Dd]isclosures?|[Rr]estrictions\sapply|Our\s[Mm]ailing\s[Aa]ddress\s[Ii]s|Careers|Questions\?|Start\swriting|Sent\svia|\BPowered\sby|Upgrade\sto\spaid|[Cc]lick\shere|(?:Contact|Follow)\s[Uu]s|Disclaimer)/u;
var CL_OPT = /opt[\-\s]out/gi;
var CL_SJ = /^\s*(re|fwd?)\s*:\s*/i;
var CL_SC = /Facebook|TikTok|Threads|Instagram|Bluesky|Reddit|Linkedin|Discord|Twitter|\bX\b|YouTube/i;
var CL_SC2 = /Share|Like|Heart|Restack|Comment|Forward/;
var CL_SDR = /<[^<>]+>|"/g;
var CL_TGA = /\s+data-[\w-]+="?\{[^}]+\}"?/gi;
var CL_TGB = /<\/?\w+\s*$/gm;
var CL_TGS = / +([\/;"]?) *>/g;
var CL_TGY = /style=" +/g;
var CL_UDD = /[\u{2013}\u{2212}\u{00AD}]/gu;
var CL_UDL = /[\p{Zp}\u{000A}\u{000d}\u{0085}\u{2028}\u{2029}\u{0000}-\u{0018}\u{001A}-\u{001F}]/gu;
var CL_UDS = /[\p{Zs}\f\u{2000}-\u{200A}\u{2007}\u{00A0}\u{0340}\u{00AD}\u{0340}\u{0020}\u{202F}]/gu;
var CL_UDZ = /[\u{2060}\u{FEFF}\u{200B}-\u{200F}\u{034F}\u{0019}]/gu;
var D_AMP = /%26/g, D_ANY = /&#x([0-9A-Fa-f]+);?/g, D_NU = /&#(\d+);?/g, D_QPB = /=\r?\n/g, D_QPC = /=([0-9A-F]{2})/g;
var F_CML = /([a-z0-9]),\s+([a-z0-9])/g;
var F_ERX = /([\|\+\*\.\?\^\$\{\}\(\)\[\]\/\\])/g;
var F_PRD = /⭕/g;
var F_TGL = /<([^<>\n\r]*?)[\n\r]+>/g;
var F_TGY = /(<\w+) *[\n\r]+ *(style.*?>)/g;
var M_AZN = /Amazon/;
var M_AZO = /Ordered/;
var M_BSR = /newsletter|blog|(?:ghost|substack|medium|blogspot|blogger|wordpress|wix|squarespace|tumblr|hostinger|strikingly|actionnetwork)\.(?:com|org|io|net|co.uk)/i;
var M_CSJ = /order|receipt|schedule|delivery|(?:pay|state|ship)ment|(?:transac|reserva)tion|app(?:t\b|ointment)|book(?:ed|ing)/i;
var M_FNR = /font-weight:\s*(?:normal|[1-5]00)/i;
var M_HTM = /(<(?:!doctype|head|style|html|body)[^<>]*?>[\S\s]+<\/(?:html|body)[^<>]*?>)/i;
var M_LBS = /[\n\r]+/g;
var M_LI = /(<li[^>]*?>([\S\s]+?)<\/li>)/g;
var M_NOP = /your\semail\ssoftware\scan't\sdisplay\sHTML\semails|this\sis\s(?:a|the)\s.*?\stemplate/i;
var M_NAT = /logo|badge|custom|icon|_|\.[a-z]{3,4}/i;
var M_ONU = /^[\d\s]+$/;
var M_OPT = /^[\p{P}\s]+$/u;
var M_OTG = /^\s*(\s*<\/?[^<>]+?>\s*)+\s*$/;
var M_PAF = /<\/html>([\S\s]+?)$/i;
var M_PBF = /^([\S\s]+?)<(?:doctype|html|head|style|body)/i;
var M_PDA = /(?:\b(S[Tt]?[Ee]?|A[VvPp][EeTt]?|R[Dd]|B(?:lvd|LVD)|H[Ww][Yy]|L[NnTt][Dd]?|C[TtIi][Rr]?|T[EeCc][RrEe]|P[LlKk]?|O|F[Ll]|I[Nn][Cc]|C[Oo]|N|E|W))\.(\s*)/gm;
var M_PDE = /(\w+@\w+)\.([a-z]{2,4})/gm;
var M_PDN = /((?:^|[>\s])\d{1,2})\.( +)/gm;
var M_PIP = /\|/;
var M_SCH = /font-size:\s*calc\(([\d[a-zA-Z%]+)\s*-\s*\1\)/gi;
var M_SCR = /score\s*:\s*([^\s,}\]]+)/i;
var M_SLT = /(?:class\saction|legal)\ssettlement/i;
var M_SYB = /bold|normal/i;
var M_SYF = /^font-style$/i;
var M_SYI = /italic/i;
var M_SYL = /^list-style(?:-type)?$/i;
var M_SYN = /none/i;
var M_SYP = /^style$/i;
var M_SYW = /^font-weight$/i;
var M_TBK = /<((?:[^<>]+?[\n\r]+[^<>]+?)+[\n\r]*?\/?)>/g;
var M_TKN = /[a-z]{4,}/g;
var M_WSO = /^[\s\|]+$/;
var M_XVL = /Expecting value/;
var M_OSP = /^\s+$/;
var P_ACN = /[\S\s]*?/;
var P_ACR = /[\S\s]+/;
var P_AC1 = /(.*?)/;
var P_ALB = /[\n\r]/g;
var P_ALR = /[A-Za-z]/;
var P_ATG = /<[^!]\/?[^>]*?>/g;
var P_APH = /[’']/;
var P_BDC = /<\/(?:\k<tag>|strong|b)>/i;
var P_BDO = /(?<!<(?:h\d|ol|ul|li)[^>]*?>)<(?:strong|\bb\b|(?!h\d|ul|ol|li)(?<tag>\w+)\s*[^<>]*?style=[^<>]*?font-weight:\s*(?:bold|[6-9]00);?)[^>]*?>/i;
var P_BL = /[\+\-#○■\*‣•—·•]/;
var P_CMI = /[^<>\-!]+?/;
var P_DCD = /(?: |%)/;
var P_DSH = /-{0,2}/;
var P_DTP = /!DOCTYPE/i;
var P_EJH = /^\s*/;
var P_EML = /[A-Za-z\d\s<>@\.\/:="]+/;
var P_HLK = /<(h\d|a\b)/i;
var P_LS = /[\n\r>]/;
var P_LBM = /(?:^|[\n\r]|>)/;
var P_LE = /[\n\r<]/;
var P_LEM = /(?:$|[\n\r]|<)/;
var P_LKO = /<(a\b|button)/i;
var P_LRN = /[A-Za-z0-9]/g;
var P_MD = /[\*_]/;
var P_MDH = /#{1,3}.*?(?:\s*\w|#{1,3})/g;
var P_NEJ = /[^\p{Emoji_Presentation}\p{Extended_Pictographic}]/u;
var P_NLB = /[^\n\r]/;
var P_NTG = /[^<>]*?/;
var P_NU = /\d+/;
var P_N12 = /\d{1,2}/;
var P_NU2 = /\d{2}/;
var P_NUL = /[\divx]{1,3}/;
var P_OLC = /(?:[\n\r]|$)/;
var P_OLO = /(?:[\n\r]|^)/;
var P_PCT = /[\?!@\(\);<>\/\\=\|]/;
var P_QTS = /["']/;
var P_SF1 = /(?:(?:(?:(?:(?:Kind|Warm)(?:est|)|Best|Thank(?:s|\s*[Yy]ou)\s*(?:and|&)\s*(?:[Kk]ind)?)\s*[Rr]egards?)|Best|(?:Kind|Warm)(?:ly|)|Regards|With [Aa]dmiration))/;
var P_SF2 = /Sincerely(?: [Yy]ours|)|Thank(?:s| [Yy]ou)(?: for [\w ]+?)|Yours(?: [Tt]ruly|Sincerely)?|Signed/;
var P_SPC = /[:!\.\?,]/;
var P_SNC = /[\w\p{P}]+?/u;
var P_SEQ = /\s*=\s*/;
var P_STB = /[ \t]*/;
var P_TAC = /<\/a>/i;
var P_TAO = /<a>/i;
var P_TCC = /<\/\1>/;
var P_TSC = /\b\s*/;
var P_TSO = /<\/?\b/;
var P_TSP = /p|div|h\d|ul|ol|li|button|img|hr/gi;
var P_TSR = /table|tr|th|tbody|thead|br|blockquote/gi;
var P_TSX = /[^>\/]*?>/;
var P_ULL = /[A-Z][a-z]/;
var P_WDD = /[\w\-]+/;
var P_WS = /\s*/;
var S_GHH = /(?:&nbsp;(?:\s*|&nbsp;)*){2,}/;
var S_HF = /(\.\s+|\n+)/;
var S_NU = /\s+|\./;
var S_WS = /\s+/g;

// STRINGS //

var CH_BD = new RegExp(`(?<emj>${CH_EJ.source} *)?${P_BDO.source}(?<num>[${P_NUL.source}\\. +)?(?<cnt>${P_ACN.source})${P_BDC.source}`, `gui`);
var CH_BNU = new RegExp(`(?:${P_SF1.source}|${P_SF2.source})${P_SPC.source}?(?:${P_ATG.source}|)${P_ALB.source}+${P_BDO.source}(${P_ACN.source})${P_BDC.source}`, `gim`);
var CH_BEJ = new RegExp(`${P_LBM.source}(${CH_EJ.source}\\s*[A-Za-z\d]${P_NLB.source}${P_NEJ.source}+?)${P_LBM.source}`, `gumi`);
var CH_BLN = new RegExp(`${P_EJH.source}${CH_EJ.source} ? *${P_LRN.source}`, `u`);
var CH_BLT = new RegExp(`<ul${P_TSX.source}`, `gi`);
var CH_BLX = new RegExp(`${P_LBM.source}(${P_BL.source})\\s*${P_NLB.source}+$${P_ALB.source}`, `gmi`);
var CH_HRL = new RegExp(`<hr${P_TSX.source}`, `gi`);
var CH_HTG = new RegExp (`<h\\d\\b${P_TSX.source}`, `gi`);
var CH_ITC = new RegExp(`<(?:\\b(?:em|i)\\b|${P_NTG.source}font-style:\\s*italic)${P_TSX.source}`, `gi`);
var CH_NUT = new RegExp(`<ol${P_TSX.source}`, `gi`);
var CH_NUX = new RegExp(`${P_LBM.source}${P_STB.source}[${P_NUL.source}[\\.\\)]\\s+${P_NLB.source}+?(?:$|${P_LE.source})`, `gm`);
var CH_PH = new RegExp(`(?:you(?:\\sare|${P_APH.source}re)\\s*(?:absolutely|completely)\\s*(?:right|correct)|that(?:${P_APH.source}s|\\sis)\\s*a?\\s*(?:great|good)\\squestion|i\\scompletely\\sunderstand|(?:just\\sto|let${P_APH.source}s)\\s*(?:clarify|be\\sclear)|would\\syou\\sbe\\s*(?:interested\\sin|open\\sto)|no\\s*(?:strings\\sattached|pressure)|totally\\sfair|that(?:\\sis|${P_APH.source}s)\\son\\sme|thank(?:s|\\syou)\\s*(?:so|very|)\\s*(?:much|)\\sfor\\syour\\s*(?:kind|thoughtful|kind\\s*(?:and|&|&amp;)\\sthoughtful)\\s*(?:reply|response|message|email|question)|thank\\syou\\sfor\\s(?:clarifying|your\\sclarification)|i\\stake\\s*(?:full|total|complete|)\\s*responsibility|i\\sjust\\s*(?:wanted|had)\\sto|(?:y[eu]p|got\\sit)\\s*(?:${CH_EMD.source}))${P_SPC.source}?`, `gui`);
var CH_QA = new RegExp(`(?:Short answer|Why|The (?:${P_SNC.source} *){1,2})\\? *[A-Z](?:${P_SNC.source} *){1,10}(?:${P_ATG.source})?\\.`, `gu`);
var CH_SF = new RegExp(`${P_LBM.source}(${P_SF1.source}${P_SPC.source}?)${P_LEM.source}`, `m`);
var CH_SF2 = new RegExp(`${P_LBM.source}(${P_SF2.source}${P_SPC.source}?)${P_LEM.source}`, `im`);
var CL_CLB = new RegExp(`(?:${P_STB.source}${P_ALB.source})+${P_STB.source}|[ \\t]{8,}`, `g`);
var CL_CMT = new RegExp(`<!(?${P_DTP.source})${P_DSH.source} *\\[?${P_CMI.source}\\]? *${P_DSH.source}>${P_DSH.source}>?|\\/\\*\\[?${P_CMI.source}\\*\\/|^ *${P_CMI.source} *-{2}>$`, `gim`)
var CL_DTY = new RegExp(`<\\s*${P_DTP.source}${P_NTG.source}>`, `i`);
var CL_XBT = new RegExp(`(${P_ATG.source})>`, `g`);
var CL_HDN = new RegExp(`<(?<tag>(?!br)\\w+)\\s*${P_NTG.source}(?:aria-hidden="true"|style=")${P_NTG.source}(?:[^-]color:\\s*transparent|display:\\s*none|(?:(?:line|max)-?(?:height|width)|(?<!-)(?:height|weight)|font-size|opacity):\\s*(?:0|calc\(?<pct>[\\d[a-zA-Z%]+)\\s*-\\s*\\k<pct>\\)|mso-hide:\\s*all|visibility:\\s*hidden))${P_TSX.source}${P_NTG.source}<\\/\\k<tag>>`, `gi`);
var CL_HDS = new RegExp(`<(?<tag>\\w+)\\s*${P_NTG.source}(?:aria-hidden="true"|style=")${P_NTG.source}(?:[^-]color:\\s*transparent|display:\\s*none|(?:(?:line|max)-?(?:height|width)|(?<!-)(?:height|weight)|font-size|opacity):\\s*(?:0|calc(?<pct>[\\d[a-zA-Z%]+)\\s*-\\s*\\k<pct>\\)|mso-hide:\\s*all|visibility:\\s*hidden))${P_NTG.source} ?\\/>`, `gi`);
var CL_LK = new RegExp(`${P_TAO.source}${P_ACN.source}${P_TAC.source}`, `gi`);
var CL_LKA = new RegExp(`${P_LKO.source}${P_NTG.source}>`, `gi`);
var CL_LKE = new RegExp(`${P_TAO.source}\\s*${P_TAC.source}`, `gi`);
var CL_MD = new RegExp(`${P_MD.source}{1,3}(${P_ACR.source}?)${P_MD.source}{1,3}`, `g`);
var CL_MBD = new RegExp(`${P_MD.source}{2}${P_AC1.source}${P_MD.source}{2}`, `g`);
var CL_MBT = new RegExp(`${P_MD.source}{3}${P_AC1.source}${P_MD.source}{3}`, `g`);
var CL_MIT = new RegExp(`${P_MD.source}${P_AC1.source}${P_MD.source}`, `g`);
var CL_MSK = new RegExp(`~~${P_AC1.source}~~`, "g");
var CL_PVS = new RegExp(`\\b(?:On\\s*(?:(?:Mon|Tues|Wed|Thurs|Fri|Sat|Sun)(?:day)?)?,?\\s*(?:${P_N12.source}\\s*)?(?:(?:Jan|Febr?)(?:uary)?|March|April|May|June|July|Aug(?:ust)?|(?:Sept|Nov|Dec)(?:ember)?|Oct(?:ober|))\\.?(?:\\s*${P_N12.source})?,?\\s*\\d{4}(?:\\s*at)?\\s*${P_N12.source}:${P_N12.source}(?::${P_N12.source})?\\s*[AaPp][Mm](?:\\s*[A-Z]{3})?,?\\s*${P_EML.source}\\s*wrote:|(?:(?:(?:Begin\\s*|\\s*-{2,10}\\s*)[Ff]orwarded|[Oo]riginal)\\s*[Mm]essage)(?:\\s*-{2,6}\\s*|:)|\\n(?:${P_BDO.source})?From:\\s*${P_EML.source}\\n)${P_ACR.source}$`);
var CL_TBC = new RegExp(`^\\s*style=${P_QTS.source}${P_NTG.source}>`, `gm`);
var CL_TFG = new RegExp(`<(figure|figcaption)${P_TSX.source}${P_ACN.source}${P_TCC.source}`, `gi`);
var CL_TFR = new RegExp(`fr-original-style${P_SEQ.source}"[^">]*(?:"[^">]*"[^">]*)*"`, `gi`);
var CL_TSP = new RegExp(`${P_TSO.source}(?:${P_TSP.source})${P_TSC.source}${P_TSX.source}`, `gi`);
var CL_TSR = new RegExp(`${P_TSO.source}(?:${P_TSR.source})${P_TSC.source}${P_NTG.source}\\s*\\/?>`, `gi`);
var CL_TDE = new RegExp(`\\s*<\\/?td${P_TSX.source}\\s*(?:<\\/?td${P_TSX.source})?\\s*(?<ej1>\\s*(?:${CH_EJ.source}|${P_BL.source}))\\s*<\\/?td${P_TSX.source}\\s*(?:<\\/?td${P_TSX.source})?\\s*`, `gui`);
var CL_TDT = new RegExp (`<\\/?td${P_TSX.source}`, `gui`);
var CL_UHM = new RegExp(`<(?!\\/?(?:\\b(b|strong|i|em|ul|ol|li|h[1-9]|hr|p|div|span|a|td)\\b))${P_TSX.source}`, `gi`);
var D_LB = new RegExp(`(?:\\r|${CL_UDL.source})`, `gu`);
var D_LTR = new RegExp(`&(${P_ALR.source}${P_LRN.source}+);?`, `g`);
var D_MD = new RegExp(`${P_DCD.source}?96`, `g`);
var F_BK = new RegExp(`\\s*(${P_TSO.source}(?:${P_TSR.source}|${P_TSP.source})${P_TSC.source}${P_TSX.source})\\s*`, `gi`);
var F_BL = new RegExp(`^\\s*(${P_BL.source})\\s*${P_ALB.source}+\\s*(${P_ALR.source})`, `gum`);
var F_CMS = new RegExp(`(${P_ALR.source}),(${P_ALR.source})`, `g`);
var F_IEJ = new RegExp(`${P_ALB.source}*<img\\s*(?:data|class)[\\-=]emoji="(.)"${P_TSX.source}${P_ALB.source}`, `gi`);
var F_NU = new RegExp(`([0-9]{1,2}\\.)\\s*${P_ALB.source}+\\s*(${P_ALR.source})`, `g`);
var F_PNC = new RegExp(`(${P_ALR.source}+)\\s+([\\.!\\?,])`, `g`);
var F_SBP = new RegExp(`<\\b(sub|sup)\\b${P_TSX.source}(${P_NTG.source})${P_TCC.source}`, `gi`);
var F_SLB = new RegExp(`(?<!${P_SPC.source}|${P_BL.source}) *${P_ALB.source} *(?! *(?:[A-Z]|${P_BL.source}|${CH_EJ.source}|\\d+?\\s[A-Z]))`, `gu`);
var F_TSP = new RegExp(`(<\\/?${P_NTG.source})\\s*(${P_ALB.source}+\\s*>)`, `gi`);
var M_ATT= new RegExp(`(${P_WDD.source})${P_SEQ.source}(?:(${P_QTS.source})(${P_ACN.source})\\2|([^\\s>]+))(?=\\s+${P_WDD.source}\\s*=|\\s*\\/?>|$)`, `gi`);
var M_HP = new RegExp(`${P_SNC.source}[\\.\\!\\?]`);
var M_IGA = new RegExp(`<img${P_NTG.source}alt${P_SEQ.source}"([\\w\\p{P} ]+?)"\\s*${P_NTG.source}>`, `gui`);
var M_LBL = new RegExp(`<ul${P_TSX.source}(${P_ACR.source}?)<\\/ul>`, `gi`);
var M_LNU = new RegExp(`<ol${P_TSX.source}(${P_ACR.source}?)<\\/ol>`, `gi`);
var M_SYA = new RegExp(`(${P_WDD.source}):\\s*([^;]+);?\\s*`, `gi`);
var S_PRA = new RegExp(`${P_ALB.source}+\\s*${P_ALB.source}+|${P_ALB.source}+(?=\\S)`, `g`);

// FONTS //

var cFt = `</font>`;
var bkbry = `<font color="#200055">`;
var rsbry = `<font color="#3f00ab">`;
var stbry = `<font color="#ff0060">`;

// MESSAGES //

var eAE = `🚫 ${stbry}<em>Sapling error. Refresh and try again.</em>${cFt}`;
var eAT = `⚠️ ${stbry}<em>Sapling timeout. Refresh and try again.</em>${cFt}`;
var eCO = `Final score based only on scanE.`;
var fBt = `🗑️ ${stbry}This message is full of junk and can't be scanned without timing out. Sorry about that.${cFt}`;
var fNC = `${rsbry}It looks like this message has no content. I'll just take a little nap until the next one. 😴${cFt}`;
var fNT = `${rsbry}The top message in this thread is too short to scan. Try another one.`;
var fSm = `${stbry}🚨 <b>STOP!! 🚨<br /><em>This email is likely a scam!</em><br /></b>(Contains hidden "dummy" text)<br />🔻 <b>DON'T</b> click any links.<br /><b>🔻 DON'T</b> open any attachments.<br />🔻 <b>REPORT</b> the email to your provider.<br />🔻 <b>DELETE </b> the email immediately.${cFt}`;
var fCZ = `🚫 ${stbry}<em>Message too large to scan. Final score based only on Sapling.</em>${cFt}`;
var fSz = `${stbry}This email is too large to process without timing out. Try another one.${cFt}`;
var fWc = `🚫 ${stbry}<em>Message too short for accurate scan. ${eCO}</em>${cFt}`;
var lAT = `🛑 SAPLING ERROR: TIMEOUT: SKIPPING SAPLING 🛑\n`;
var lBH = `🚫 NOT BOLD HEADING:`;
var lBN = `🚫 NOT BOLD NAME:`;
var lBS = `🚫 NOT BOLD SENTENCE:`;
var lBT = `🚫 NOT BOLD TEXT:`;
var lHS = `🛑 🚨 SCAM! 🚨 (SNEAKY HIDDEN TEXT) 🚨 🛑`;
var lNH = `🛑 NO HTML: USING PLAIN TEXT`;
var lSm = `🛑 🚨 SCAM! 🚨 (DISSIMILAR) 🚨 🛑`;
var rNC = `MESSAGE HAS NO CONTENT`;
var rNT = `TOP MESSAGE HAS NO CONTENT`;
var rTo = `TIMEOUT`;
var rWc = `WORD COUNT < 5`;
var tb = `\n   - `;

// FUNCTIONS //

// HELPER FUNCTIONS //

function clM(src) { return src.map(m => eRx(m).trim()).join('|'); };
function clp(txt) { return String(txt || "").replace(CL_CPS, " ").replace(CL_CLB, "\n").trim(); };
function cTg(txt) { return txt.replace(P_ATG, ""); };
function nNl(vbl) { return (vbl === "undefined" || vbl === "" || vbl === null || !vbl) ? true : false; };
function cWd(str) { return nNl(str) ? 0 : (String(str).trim()).split(S_WS).filter(Boolean).length; };
function cCn(src) { return (M_OTG.test(src) && cWd(src) < 5) ? false : true; };
function eRx(txt) { return txt.replace(F_ERX, "\\$1"); };
function lCs(chr) { return chr.toLowerCase(); };
function lIx(ptn) { return ptn.lastIndex = 0; };
function rd2(num) { return Number(num.toFixed(2)); };
function tPt(num) { return rd2((num * 100)); };
function stp(src) { return src = cTg(src).replace(CH_EJ, ""); };
function uCs(chr) { return chr.toUpperCase(); };

function ckL(lb, dta) {
  if (nNl(dta)) { return; };
  const txt = (typeof dta === 'object') ? JSON.stringify(dta, null, 2) : String(dta);
  const sz = 4000; let c = 0;
  for (let i = 0; i < txt.length; i += sz) {
    c++;
    console.log(`${lb} CHUNK ${c} of ${Math.ceil(txt.length / sz)}:\n${txt.substring(i, i + sz)}`);
  }
}

function rRx(out, chs, clL) {
  if (clL === "HTML" || clL === "Plain Text" || clL === "Postclean") {
    chs.forEach(([p, r, l]) => {
      out = (r === "f") ? p(out) : out.replace(p, r);
      if (dbg) { console.log(`🆗 COMPLETED: ${l} 🆗`) };
      if (dCl) { ckL(`🐞🐞 AFTER ${clL} ${l} 🐞🐞`, clp(out)); };
    });
  } else {
    chs.forEach(([p, r]) => {
      out = (r === "f") ? p(out) : out.replace(p, r);
    });
  }
  if (dbg) { console.log(`🆗 COMPLETED: ${clL} rRx 🆗`) };
  return out;
}

function cTC(num) {
  if (!Number.isFinite(num)) { return ""; };
  try {
    return String.fromCodePoint(num);
  } catch (e) { return ""; };
}

function dMg(src) {
  const ENT = {
    amp: "&", apos: "'", bull: "•", copy: "©", gt: ">", hellip: "…", laquo: "«", lsquo: "'",
    ldquo: '"', lt: "<", mdash: "—", middot: "·", nbsp: " ", ndash: "-", newline: "\n",
    ntilde: "ñ", ordm: "°", quot: '"', raquo: "»", rarr: "→", reg: "®", rsaquo: "›",
    rsquo: "'", rdquo: '"', shy: "", times: "×", trade: "™", zwnj: ""
  },
  RGX1 = [ [D_QPB, ""], [D_QPC, "%$1"] ],
  RGX2 = [
    [D_ANY, (_, hex) => cTC(parseInt(hex, 16))],
    [D_NU, (_, dec) => cTC(parseInt(dec, 10))],
    [D_LTR, (m, name) => (name in ENT ? ENT[name] : m)],
    [D_AMP, "&"], [D_LB, "\n"], [D_MD, "—"]
  ]
  let out = String(src || "");
  const clL = "Decode Message";
  if (D_QPC.test(out)) {
    out = rRx(out, RGX1, clL);
    try { out = decodeURIComponent(out); } catch (e) { out; };
  }
  out = rRx(out, RGX2, clL);
  if (dbg) { console.log(`🆗 COMPLETED: dMg 🆗`); };
  return out;
}

function fxT(src) {
  let mch; const wdC = cWd(src);
  for (let i = 0; i < wdC; i++) {
    while ((mch = M_TBK.exec(src)) !== null) {
      src = src.replace((new RegExp(`${eRx(mch[0])}`)), (mch[0].replace(M_LBS, " ")));
    }
  }
  src = src.replace(CL_TGS, "$1>");
  return src;
}

function cHS(htm) {
  const tgs = [
    { o: `<head`, c: `</head>`, l: 7 }, { o: `<style`, c: `</style>`, l: 8 }
  ];
  tgs.forEach(tg => {
    const lcH = lCs(htm); let res = "", i = 0;
    while (i < htm.length) {
      const st = lcH.indexOf(tg.o, i), nd = lcH.indexOf(tg.c, st);
      if (st === -1) { res += htm.slice(i); break; };
      res += htm.slice(i, st);
      if (nd === -1) { res += htm.slice(st); break; };
      i = nd + tg.l;
    }
    htm = res;
  });
  if (dbg) { console.log(`🆗 COMPLETED: cHS 🆗`) };
  return htm;
}

function cIA(src) {
  let txt = String(src || ""), ig;
  while ((ig = M_IGA.exec(txt)) !== null) {
    const alt = ig[1] || "", p = new RegExp(`${eRx(ig[0])}`);
    const notAlt = M_NAT.test(alt), sp = / /.test(alt);
    if (alt.length > 3 && !notAlt && sp) {
      txt = txt.replace(p, `${alt}`);
    } else { txt = txt.replace(p, ""); };
  }
  return txt;
}

function cAt(htm) {
  lIx(P_ATG); let tg, nLs = false;
  while ((tg = P_ATG.exec(htm)) !== null) {
    lIx(M_ATT);
    let ts = tg[0], am, ct = ts.replace(CL_TGA, "");
    while ((am = M_ATT.exec(ts)) !== null) {
      let ma = am[0], mn = am[1];
      if (M_SYP.test(mn)) {
        let cs = (am[3] || am[4] || "").replace(M_SYA, function(pp, pn, pv) {
          let nm = parseInt(pv, 10);
          const ps = [
            { py: M_SYL.test(pn), vl: M_SYN.test(pv), tg: CH_BLT.exec(ts) },
            { py: M_SYF.test(pn), vl: M_SYI.test(pv) },
            { py: M_SYW.test(pn), vl: M_SYB.test(pv) || (nm >= 600 && nm <= 900) }
          ];
          const m = ps.find(p => p.py); if (m) {
            if (m.py && m.vl) {
              if (m.tg) { nLs = true; }; return pp;
            } else { return ""; };
          } else { return ""; }
        });
        let tm = cs.replace(S_WS, "").trim();
        if (cs && (tm !== null && tm !== undefined && tm !== "")) {
          ct = ct.replace(ma, `style="${cs}"`);
        } else { ct = ct.replace(ma, "") };
      } else if (CL_ATT.test(mn)) { ct = ct.replace(ma, "") };
    }
    if (ct !== ts) {
      ct = ct.replace(CL_TGS, "$1>").replace(CL_TGY, `style="`).trim();
      htm = htm.slice(0, tg.index) + ct + htm.slice(tg.index + ts.length);
      P_ATG.lastIndex = tg.index + ct.length;
    }
  }
  return { htm, nLs };
}

function cBT(out) {
  const ts = ["div", "span", "p", "td"];
  ts.forEach(tg => {
    const bt = new RegExp(`<${tg}>`, "i"),
    ol = tg.length + 2, cl = tg.length + 3;
    let st = out.search(bt);
    while (st !== -1) {
      let dt = 1, i = st + ol;
      while (i < out.length) {
        const rt = out.slice(i);
        if ((new RegExp(`^<${tg}[\\s>]`, "i")).test(rt)) {
          dt++; i += ol; continue;
        }
        if ((new RegExp(`^<\\/${tg}>`, "i")).test(rt)) {
          dt--;
          if (dt === 0) {
            out = out.slice(0, i) + out.slice(i + cl);
            out = out.slice(0, st) + out.slice(st + ol);
            break;
          }
          i += cl; continue;
        }
        i++;
      }
      if (dt !== 0) {
        const nt = out.slice(st + ol).search(bt);
        st = nt === -1 ? -1 : st + ol + nt;
      } else { st = out.search(bt); };
    }
  });
  return out;
}

function cvL(txt) {
  let nL, bL;
  while ((nL = M_LNU.exec(txt)) !== null) {
    for (let i = 0; i < nL[1].length;) {
      const nLi = M_LI.exec(nL[1]);
      if (nNl(nLi)) { continue; } else if (nLi) {
        const nPt = new RegExp(`${eRx(nLi[1])}`); i++;
        txt = txt.replace(nPt, `${i}. ${nLi[2].replace(P_ALB, " ")}`);
      }
    }
  }
  while ((bL = M_LBL.exec(txt)) !== null) {
    lIx(M_LI);
    for (let j = 0; j < bL[1].length;) {
      const bLi = M_LI.exec(bL[1]);
      if (nNl(bLi)) { break; } else if (bLi) {
        const bLiPtn = new RegExp(`${eRx(bLi[1])}`); j++;
        txt = txt.replace(bLiPtn, `• ${bLi[2].replace(P_ALB, " ")}`);
      }
    }
  }
  return txt;
}

function fxP(out) {
  const ptns = [
    [F_PNC, "$1$2"], [F_NU, "$1 $2"],
    [F_CMS, "$1, $2"], [F_CML, "$1, $2"]
  ];
  out = rRx(out, ptns, "Fix Punctuation");
  return out;
}

function cPL(rwP, wdC) {
  let plk;
  for (let i = 0; i < wdC; i++) {
    while ((plk = CL_LKI.exec(rwP)) !== null) {
      if (!M_NAT.test(plk[1])) {
        const pLp = new RegExp(`${eRx(plk[0]) || ""}`);
        rwP = rwP.replace(pLp, `${plk[1]}`);
      }
    }
  }
  return rwP;
}

function xHP(raw) {
  lIx(P_ATG);
  const out = String(raw || ""), fh = M_HTM.exec(out),
  pA = M_PAF.exec(out);
  const xH = nNl(fh) ? raw : fh[1].trim();
  let xP = nNl(pA) ? null : pA[1].trim();
  if (nNl(xP) || (cWd(xP) < (cWd(xH) / 4)) || P_ATG.test(xP)) {
    xP = null;
  }
  if (dbg) { console.log(`📝 EXTRACTED PLAIN TEXT:\n${xP}`); };
  return { xH, xP };
}

function cHC(htm, clL) {
  if (nNl(htm)) {
    if (dbg) {
      console.log(`🛑 NO HTML: SKIPPING HTML CLEANING 🛑`);
    }
    return { out: htm, cMs: false, cWs: false, thH: false };
  }  
  let out = String(htm || "");
  const thH = CL_PVS.test(out), cWs = CH_WS.test(out), cMs = CH_MS.test(out);
  out = out.replace(CL_PVS, "$1");
  const chs = [
    [fxT, "f", "fxT"],        [F_BK, "\n$1\n", "F_BK"], [CL_HDN, "", "CL_HDN"],     [CL_HDS, "", "CL_HDS"],
    [CL_CMT, "", "CL_CMT"],   [cHS, "f", "cHS"],        [CL_UDZ, "", "CL_UDZ"],     [CL_UDS, " ", "CL_UDS"],
    [CL_UDD, "-", "CL_UDD"],  [CL_UDL, "\n", "CL_UDL"], [F_SBP, " ($2) ", "F_SBP"], [F_TGY, "$1 $2", "F_TGY"],
    [F_IEJ, "$1", "F_IEJ"],   [cIA, "f", "cIA"],        [CL_TSR, "\n\n", "CL_TSR"], [CL_TDE, "$<ej1> ", "CL_TDE"],
    [CL_TDT, "\n", "CL_TDT"], [CL_TFR, "", "CL_TFR"],   [CL_TFG, "\n", "CL_TFG"],   [F_TGL, "<$1>", "F_TGL"],
    [F_TSP, "$1$2", "F_TSP"], [CL_UHM, "", "CL_UHM"],   [CL_AFT, "", "CL_AFT"],     [h => cAt(h).htm, "f", "cAt"],
    [cBT, "f", "cBT"],        [cvL, "f", "cvL"],        [CL_LKA, "<$1>", "CL_LKA"], [CL_LKS, "$1", "CL_LKS"],
    [CL_LKE, "", "CL_LKE"],   [CL_DSH, "", "CL_DSH"],   [CL_XBT, "$1", "CL_XBT"],   [fxP, "f", "fxP"]
  ];
  out = rRx(out, chs, clL); out = clp(out);
  if (dbg) { console.log(`🆗 COMPLETED: cHC 🆗`); };
  return { out, cMs, cWs, thH };
}

function cPC(ptx, clL) {
  if (nNl(ptx)) {
    if (dbg) {
      console.log(`🛑 NO PLAIN TEXT: SKIPPING PLAIN CLEANING 🛑`);
    }
    return { out: ptx, thP: false };
  }
  let out = String(ptx || "");
  const thP = CL_PVS.test(out);
  if (thP) { out = out.replace(CL_PVS, "$1") };
  out = cTg(out);
  const chs = [
    [CL_UDZ, "", "CL_UDZ"],   [CL_UDS, " ", "CL_UDS"],  [CL_UDD, "-", "CL_UDD"],
    [CL_UDL, "\n", "CL_UDL"], [CL_CMT, "", "CL_CMT"],   [CL_LKP, "", "CL_LKP"],
    [F_PNC, "$1$2", "F_PNC"], [CL_MD, "$1", "CL_MD"],   [CL_AFT, "", "CL_AFT"],
    [F_NU, "$1 $2", "F_NU"],  [CL_LKS, "$1", "CL_LKS"], [CL_DSH, "", "CL_DSH"],
    [CL_MIT, "$1", "CL_MIT"], [CL_MBD, "$1", "CL_MBD"], [CL_MBT, "$1", "CL_MBT"],
    [CL_MSK, "$1", "CL_MSK"], [P_MDH, "", "P_MDH"]
  ];
  out = rRx(out, chs, clL);
  const pWC = cWd(out);
  out = cPL(out, pWC); out = clp(out);
  if (dbg) { console.log(`🆗 COMPLETED: cPC 🆗`); };
  return { cnP: out, thP };
}

function sHF(txt) {
  const ps = [M_PDA, M_PDN, M_PDE];
  ps.forEach(p => txt = txt.replace(p, "$1⭕$2"));
  let cks = txt.split(S_HF), out = [];
  for (let i = 0; i < cks.length; i += 2) {
    let t = cks[i] ?? "", sp = cks[i + 1] ?? "";
    if (t === "" && sp === "") { continue; };
    out.push([t, sp]);
  }
  return out;
}

function cLT(txt) { return CL_LLN.test(txt); };
function fLn(ln, rx) { return ln.filter(w => rx.test(w)) };

function jHF(cks) {
  let jd = "";
  for (let i = 0; i < cks.length; i++) {
    jd += cks[i][0] + cks[i][1];
  }
  return jd;
}

function fxS(txt) {
  const ps = [". ", "! ", "? "];
  ps.forEach(p => {
    let scs = txt.split(p);
    scs = scs.map(sc => sc.replace(F_SLB, " "));
    txt = scs.join(p);
  });
  if (dbg) { console.log(`🆗 COMPLETED: fXs 🆗`); };
  return txt;
}

function mSI(l1, l2) {
  let lMc = false;
  if (l1.length > 0) {
    l1 = [...new Set(l1)];
    if (l1.length > 0) {
      if (l1.length > 1) { lMc = true; };
      if (l2.length > 0) {
        l2 = [...new Set(l2)];
        if (l2.length > 0) { lMc = true; };
      }
    }
    if (dev && lMc) {
      console.log(`🌐 SOCIAL MATCH(ES) 🌐:${tb}${l1}${tb}${l2}`);
    }
  }
  return lMc;
}

function cHF(src, stl) {
  let txt = fxS(src.trim());
  const lns = sHF(txt).filter(ln => !M_OTG.test(ln[0])).filter(ln => !M_OPT.test(ln[0])),
  lsL = lns.length, hEd = Math.min((lsL * 0.2), lsL), fSt = Math.max(hEd, lsL - (lsL * 0.8));
  const hFr = jHF(lns.slice(fSt));
  let hdr = lns.slice(0, hEd), ftr = lns.slice(fSt);
  hdr = hdr.map(ln => [cTg(ln[0]).replace(F_PRD, "."), ln[1]]);
  ftr = ftr.map(ln => [cTg(ln[0]).replace(F_PRD, "."), ln[1]]);
  const wdC = cWd(jHF(hdr) + `\n` + jHF(ftr));
  if (dev) { console.log(`📐 PRECLEAN WORD COUNT: ${wdC}\n📐 LINES: ${lsL}`); };
  if (wdC < 30) { return { txt, ftr: txt, hFr: txt }; };
  const hps = [CL_HR, CL_HFF];
  hps.forEach(hp => {
    if (hdr.some(ln => hp.test(ln[0]))) {
      if (dev) {
        console.log(`🗣️ HEADER MATCH(ES) 🗣️:\n${hdr.filter(ln => hp.test(ln[0]))}`);
      }
      hdr = hdr.filter(ln => !hp.test(ln[0]));
    }
  });
  hdr = jHF(hdr);
  const lF = ftr.length >= 20;
  let lLs = lF ? ftr.slice(-15) : ftr.slice(-8),
  fLs = lF ? ftr.slice(0, -15) : ftr.slice(0, -8);
  const lLn = lLs[lLs.length - 1];
  if ((lLs.map(ln => ln[0].match(CL_AD))).filter(Boolean) || (lLs.map(ln => ln[0].match(CL_AD2))).filter(Boolean)) {
    for (let i = 0; i < lLs.length; i++) {
      const aL1 = lLs[i] || [], aL2 = lLs[i + 1] || [], aL3 = lLs[i + 2] || [];
      const mA1 = CL_AD.exec(aL1[0] || []),
      mA2 = CL_AD.exec(aL2[0] || []) || CL_AD2.exec(aL2[0] || []),
      mA3 = CL_AD.exec(aL3[0] || []) || CL_AD2.exec(aL3[0] || []);
      if (nNl(aL1) || !mA1) { continue; };
      if (mA1) {
        if (dev) {
          console.log(`🏠 ADDRESS MATCH(ES): ${tb}${mA1}` + (mA2 ? `${tb}${mA2}` : '') + (mA3 ? `${tb}${mA3}` : ''));
        }
        if (mA2) {
          if (mA3) {
            lLs.splice(i,3);
          } else if (!mA3 || aL2 === lLn) {
            lLs.splice(i,2);
          }
        } else { lLs.splice(i); };
      } else if ((!mA2 && !mA3) || aL1 === lLn) {
        lLs.splice(i);
      }
    }
  }
  let sMc = false, iMc = false;
  for (let j = 0; j < lLs.length; j++) {
    const l1 = (String(lLs[j]).trim()).split(S_WS),
    l2 = (String(lLs[j + 1]).trim()).split(S_WS);
    if (l1.length === 0 && l2.length === 0) { break; };
    const sM1 = fLn(l1, CL_SC), sM2 = fLn(l2, CL_SC),
    iM1 = fLn(l1, CL_SC2), iM2 = fLn(l2, CL_SC2);
    sMc = mSI(sM1, sM2); iMc = mSI(iM1, iM2);
    if (sMc || iMc) { break; };
  }
  const lps = [CL_SC, CL_SC2];
  if (sMc || iMc) {
    lps.forEach(lp => { lLs = lLs.filter(ln => !lp.test(ln[0])); });
  }
  if (lLs.some(ln => cLT(ln[0]))) {
    if (dev) {
      console.log(`🔚 LAST LINES MATCH(ES) 🔚:\n${lLs.filter(ln => cLT(ln[0]))}`);
    }
    lLs = lLs.filter(ln => !cLT(ln[0]));
  }
  if (!stl) {
    lLs = lLs.map(ln => [ln[0].replace(CL_OPT, ""), ln[1]]);
  }
  ftr = (nNl(lLs)) ? fLs : fLs.concat(lLs);
  const sF = jHF(ftr), fps = [CL_FR, CL_FRB, CL_FRC, CL_HFF];
  fps.forEach(fp => {
    if (ftr.some(ln => fp.test(ln[0]))) {
      if (dev) {
        console.log(`👣 FOOTER MATCHES 👣:\n${ftr.filter(ln => fp.test(ln[0]))}`);
      }
      ftr = ftr.filter(ln => !fp.test(ln[0]));
    }
  });
  ftr = jHF(ftr);
  const prndWc = cWd(hdr) + cWd(ftr);
  if (dev) { console.log(`📐 PRUNED WORD COUNT: ${prndWc}`); };
  if (prndWc <= (wdC / 4)) {
    if (dev) { console.log(`🛑 OVER-PRUNED: USING SAFE FOOTER 🛑`); };
    ftr = sF;
  }
  txt = clp(hdr + `\n` + ftr);
  if (dbg) { console.log(`🆗 COMPLETED: cHF 🆗`); };
  return { txt, hFr };
}

function pCl(src, clL) {
  let out = String(src || "");
  const RGX = [
    [CL_TSP, "\n", "CL_TSP"], [CL_TBC, "", "CL_TBC"], [CL_TGB, "", "CL_TGB"],
    [stp, "f", "stp"], [fxS, "f", "fxS"], [F_BL, "$1 $2", "F_BL"]
  ];
  out = rRx(out, RGX, clL); out = clp(out);
  if (dbg) { console.log(`🆗 COMPLETED: ${clL} pCl 🆗`); };
  return out;
}

// FILTERS //

function cnF(clH, clP, isT) {
  let h = true, p = true, r = "", v = "", fm = isT ? fNT : fNC;
  const hWc = cWd(clH), pWc = cWd(clP), lg = isT ? rNT : rNC,
  pTp = M_NOP.exec(clP), hLW = hWc < 5, pLW = pWc < 5,
  lbD = rd2(pWc / clP.split("\n").length),
  nLb = ((lbD > 40) || !P_ALB.test(clP));
  if (dev) {
    console.log(`🚰 CONTENT FILTER: 🚰${tb}H WORD COUNT: ${hWc}${tb}P WORD COUNT: ${pWc}${tb}LINE BREAK DENSITY: ${lbD}`);
  }
  if (nNl(clH) || hLW) { h = false; v = `HTML`; };
  if (nNl(clP) || pLW || pTp || nLb) { p = false; v = `PLAIN TEXT`; };
  if (!h && !p) { if (dev) {
    console.log(`🛑 ${lg} 🛑`); };
    return { h: false, p: false, fm };
  }
  if (!h || !p) {
    const rns = [
      { c: hLW || pLW, r: rWc },
      { c: nLb, r: `LINE BREAK DENSITY (${lbD})` },
      { c: pTp, r: `PLACEHOLDER/TEMPLATE (${pTp})` },
    ];
    rns.forEach(rn => { if (rn?.c) { r = rn.r; }; });
    if (dev) {
      console.log(`🛑 ${v} ${lg} (${r}): SKIPPING SCAM CHECK 🛑`);
    }
  }
  return { h, p, fm };
}

function szF(src, td, lb) {
  const txt = String(src || "");
  let sz = txt.length, unt = `B`;
  const kb = 1024, mb = 1048576, bMg = (sz > td) ? true : false;
  if (sz > kb) {
    if (sz > mb) {
      sz = sz / mb; unt = `MB`;
    } else {
      sz = sz / kb; unt = `KB`;
    }
  }
  const mSz = rd2(sz) + ` ` + unt;
  if (dev) {
    console.log(bMg ? `🛑 ${lb} MSG. SIZE (${mSz}) 🛑` : `📐 ${lb} SIZE: ${mSz}`);
  }
  return bMg;
}

function btF(raw) {
  raw = raw.replace(CL_CMT, "");
  const chs = [
    { ch: raw.split(S_GHH).length > 20, rn: `👻 GHOST HEADER` },
    { ch: ((raw.split("<").length - 1) / raw.length) > 0.25, rn: `🏷️ TAG DENSITY` },
    { ch: raw.split("mso]").length > 10, rn: `🔭 OUTLOOK TAGS` }
  ];
  const mch = chs.find(c => c.ch);
  if (mch) {
    if (dev) { console.log(`🛑 BLOATED (${mch.rn}) 🛑`); };
    return true;
  }
  return false;
}

function dSm(clH, clP) {
  let scm = false, hMC = 0, pMC = 0;
  clH = pCl(clH, "Detect Scam"); clP = stp(clP);
  const gTk = (txt) => new Set(lCs(String(txt || "")).match(M_TKN) || []),
  hTk = gTk(clH), pTk = gTk(clP);
  hTk.forEach(token => { if (pTk.has(token)) hMC++; });
  pTk.forEach(token => { if (hTk.has(token)) pMC++; });
  const htS = hTk.size, ptS = pTk.size, hSi = htS ? (hMC / htS) : 0,
  pSi = ptS ? (pMC / ptS) : 0, smM = Math.min(hMC, pMC),
  smT = Math.min(htS, ptS), incl = Math.abs(smM - smT) < 3,
  min = hMC > pMC ? `HTML` : `PLAIN TEXT`;
  if (hSi < 0.4 && pSi < 0.4 && !incl) { scm = true; };
  if (dev) {
    console.log(`🔎 INCLUDES: 🔎${tb}TOTAL TOKENS (${min}) = ${smT}${tb}MATCHED TOKENS = ${smM}${tb}INCLUDES? ${incl}`);
    console.log(`🔎 SIMILARITY: 🔎${tb}H/P = ${tPt(hSi)}%${tb}P/H = ${tPt(pSi)}%`);
  }
  if (dbg) { console.log(`🆗 COMPLETED: dSm 🆗`); };
  return scm;
}

function ckT(txt, mgL) {
  const s = String(txt || ""), cks = [];
  let srt = 0, N = s.length;
  while (srt < N) {
    let end = Math.min(srt + mgL, N);
    const pce = s.slice(srt, end).trim();
    if (end < N) { let wst = s.lastIndexOf(" ", end - 1);
    if (wst <= srt) wst = end; end = wst; };
    if (pce) cks.push(pce); srt = end + 1;
  }
  return cks;
}

// MATCHERS & COUNTERS //

function mBC(src, sbj, sdr) {
  let txt = String(src || ""), bg = false, bgC = false;
  const fPns = [CL_FR, CL_FRC, CL_HR, CL_LLN];
  fPns.forEach(fPn => { lIx(fPn);
  if (fPn.test(txt)) { bgC = true; }; });
  if (M_BSR.test(sdr) || CL_FRB.test(txt)) { bg = true; };
  if (M_CSJ.test(sbj) || bg)  { bgC = true; };
  if (dbg) { console.log(`🆗 COMPLETED: mBC 🆗`); };
  return { bg, bgC };
}

function mBd(wds, lbl) {
  let v = "", r = "", bHg = true, bNm = true, bSc = true;
  const wdC = wds.length, nm = lbl === `name`, clW = `("${(String(wds)).replace(/,/g, " ")}")`;
  const slcs = [
    { ch: wdC < 2,         r: `IS < 2 WORDS` },
    { ch: M_OTG.test(wds), r: `IS ONLY TAG(S)` },
    { ch: M_ONU.test(wds), r: `IS ONLY NUMBER(S)` },
    { ch: M_OPT.test(wds), r: `IS ONLY PUNCTUATION` },
    { ch: M_PIP.test(wds), r: `CONTAINS PIPE` }
  ];
  const sMc = slcs.find(slc => slc.ch);
  if (sMc) {
    if (dBd && !nm) { console.log(`${lBT} TEXT ${sMc.r} ${clW}`) };
    return { bHg: false, bNm: false, bSc: false };
  }
  for (let i = 0; i < wds.length; i++) {
    const wd = wds[i].trim(), l1 = wd.charAt(0), lw1 = wds[0].charAt(0);
    if (!wd || wdC === 1 || M_OSP.test(wd) || M_OPT.test(wd)) { continue; };
    const cps = wd === uCs(wd), l1l = l1 !== uCs(l1),
    nu = P_NU.test(wd), w1l = lw1 !== uCs(lw1);
    if (cps || l1l || nu) { bNm = false; v = lBN; };
    if (w1l) { bHg = false; v = lBH; };
    const wlcs = [
      { ch: cps, r: ` IS ALL CAPS` },
      { ch: nu,  r: ` CONTAINS NUMBER(S)` },
      { ch: w1l, r: ` IS NOT CAPITALIZED`, fst: true },
      { ch: l1l, r: `'S 1ST LETTER IS NOT CAPITALIZED` }
    ];
    const wMch = wlcs.find(wlc => wlc.ch);
    if (wMch) {
      const fst = wMch.fst ? `1ST ` : ``;
      if (dBd && !nm) { console.log(`🚫 ${v} ${fst}WORD${wMch.r} ("${wd}")`); };
    }
  }
  if (wdC < 3) { bSc = false; v = lBS; r = `IS < 3 WORDS`; };
  if (wdC > 4) { bNm = false; v = lBN; r = `IS > 4 WORDS`; };
  if (wdC > 8) { bHg = false; v = lBH; r = `IS > 8 WORDS`; };
  if (!nm) {
    if (dBd) { console.log(`${v} TEXT ${r} ${clW}`); };
    if (dbg) { console.log(`🆗 COMPLETED: mBd 🆗`); };
  }
  return { bHg, bNm, bSc };
}

function mBN(ftr) {
  lIx(S_NU); lIx(CH_BNU); let cBN = false, bNT = "";
  const mch = CH_BNU.exec(ftr);
  if (!mch) {
    if (dBd) { console.log(`${lBN} NO SIGN-OFF`); };
    return { cBN, bNT };
  }
  let mTx = cTg(String(mch[2] || ""));
  if (nNl(mTx)) {
    if (dBd) { console.log(`${lBN} NO MATCHED TEXT`); };
    return { cBN, bNT };
  } else {
    const wds = mTx.split(S_NU).filter(w => w), wc = wds.length;
    const rls = [
      { ch: wc <= 1, r: `WORD COUNT <= 1` },
      { ch: wc >= 5, r: `WORD COUNT >= 5` },
      { ch: P_PCT.test(mTx), r: `CONTAINS SENTENCE PUNCTUATION` },
    ];
    const rm = rls.find(rl => rl.ch);
    if (rm) {
      if (dBd) { console.log(`${lBN} ${rm.r} ("${mTx}")`); };
    } else if (mBd(wds, `name`).bNm) {
      cBN = true; bNT = mTx;
      if (dev) { console.log(`✅ BOLD NAME MATCH: ${mTx}`); };
    }
  }
  if (dbg) { console.log(`🆗 COMPLETED: mBN 🆗`); };
  return { cBN, bNT };
}

function cBd(src, cBN, bNT) {
  lIx(CH_BD); let mch, bd = { bHC: 0, bSC: 0, eHC: 0, nHC: 0, hLs: 0 };
  const txt = src.replace(CL_LK, "").trim();
  while ((mch = CH_BD.exec(txt)) !== null) {
    let mTx = String(mch[0]), lg = ""; const bdM = `("${mTx}")`;
    if (mch.length === 0) { continue; };
    if (M_FNR.test(mTx)) {
      if (dBd) { console.log(`${lBT} INLINE NORMAL FONT ${bdM}`) };
      continue;
    }
    const mEj = mch.groups.emj, mNo = mch.groups.num, cn = mch.groups.cnt, clM = eRx(mTx),
    tOy = M_OTG.test(cn), { bHg, bSc } = mBd(cn.split(S_WS), `count`);
    if (bHg) {
      if (!((new RegExp(`${P_OLO.source}\\s*(${clM})\\s*${P_OLC.source}`)).test(txt))) {
        if (dBd) { `${lBH} NOT OWN LINE ${bdM}` };
        continue;
      }
      if ((new RegExp(`${clM}`)).test((txt.split('\n')).filter(l => (!M_OTG.test(l) && !M_WSO.test(l))).slice(-5).join('\n'))) {
        if (dBd) { `${lBH} LAST 5 LINES ${bdM}` };
        continue;
      }
      const rls = [
        { ch: tOy, r: `TAGS ONLY` },
        { ch: M_HP.test(cn), r: `SENTENCE PUNCTUATION` },
        { ch: (CH_SF.test(cn) || CH_SF2.test(cn)), r: `SIGN-OFF` },
        { ch: (cBN && (new RegExp(bNT)).test(cn)), r: `SIGNATURE` },
      ];
      const rm = rls.find(rl => rl.ch);
      if (rm) {
        if (dBd) { console.log(`${lBH} ${rm.r} ${bdM}`); };
        continue;
      } else {
        if (mEj) {
          bd.eHC++; lg = `🙂 EMOJI HEADING MATCH: "${mEj}"`;
        } else if (mNo) {
          bd.nHC++; lg = `🔢 NUMBER HEADING MATCH: "${mNo}"`;
          if (CH_N1.test(mNo)) { bd.hLs++; };
        } else {
          bd.bHC++; lg = `🔝 BOLD HEADING MATCH: "${cn}"`;
        }
      }
    } else if (bSc && !tOy) { bd.bSC++; lg = `🖊️ BOLD SENTENCE MATCH: "${cn}"`; };
    if (dev && lg !== "") { console.log(lg); };
  }
  if (dbg) { console.log(`🆗 COMPLETED: cBd 🆗`); };
  return bd;
}

function cBl(txt) {
  const ptns = [CH_BEJ, CH_BLN, CH_BLT, CH_BLX];
  ptns.forEach(ptn => lIx(ptn));
  let blC = 0, eBlC = 0, ejC = 0, tBl = 0, xBl = 0;
  const ulTg = txt.match(CH_BLT), nLs = cAt(ulTg).nLs;
  if (ulTg && !nLs) { tBl += ulTg.length; };
  txt = cTg(txt);
  const blTx = CH_BLX.exec(txt), blEj = CH_BEJ.test(txt), pghs = txt.split(S_PRA);
  let ctv = 0, gap = 0, i = 0, pgh = "";
  if (blTx) {
    const fstBl = String(eRx(blTx[1]));
    for (i = 0; i < pghs.length; i++) {
      pgh = pghs[i].trim(); if (!pgh) { continue; };
      if ((new RegExp(`^${fstBl}\\s*${P_LRN.source}`)).test(pgh)) {
        ctv++; gap = 0;
      } else if (ctv > 0) {
        gap++;
        if (gap >= 1) {
          if (ctv >= 2) { xBl++; };
          ctv = 0; gap = 0;
        }
      }
    }
    if (ctv >= 2) { xBl++; };
  }
  blC = tBl + xBl;
  if (blEj) {
    for (i = 0; i < pghs.length; i++) {
      pgh = pghs[i].trim();
      if (!pgh) { continue; };
      if (CH_HTG.test(pgh)) { i++; };
      const ejSt = CH_BLN.test(pgh);
      if (ejSt) {
        ctv++; gap = 0;
      } else if (ctv > 0) {
        gap++;
        if (gap >= 1) {
          if (ctv >= 2) { eBlC++; ejC += ctv; };
          ctv = 0; gap = 0;
        }
      }
    }
    if (ctv >= 2) { eBlC++; ejC += ctv; };
  }
  if (dbg) { console.log(`🆗 COMPLETED: cBl 🆗`); };
  return { blC, eBlC, ejC };
}

function cNu(txt) {
  lIx(CH_NUX); lIx(CH_NUT); let nCt = 0, nTC = 0, nXC = 0;
  const clTx = cTg(txt), nTg = txt.match(CH_NUT), nTx = clTx.match(CH_NUX);
  if (nTg && !cAt(nTg).nLs) { nTC += nTg.length; };
  if (nTx && CH_N1.test(nTx)) { nXC += 1; }; nCt = nTC + nXC;
  if (dbg) { console.log(`🆗 COMPLETED: cNu 🆗`); };
  return nCt;
}

function mQa(txt) {
  let cQa = true, qaM = txt.match(CH_QA);
  if (!qaM) { return false; };
  if (dev && qaM) { console.log(`❔ Q&A MATCH(ES): ${cTg(qaM[0])}`); };
  for (let i = 0; i < qaM.length; i++) {
    if (nNl(qaM)) { continue; };
    const clM = eRx(qaM[0]);
    if ((new RegExp(P_OLO.source + clM + P_OLC.source, `i`)).test(txt) && (new RegExp(P_HLK.source + P_TSX.source + clM + P_TCC.source, `i`)).test(txt)) {
      cQa = false;
    }
  }
  if (dbg) { console.log(`🆗 COMPLETED: mQa 🆗`); };
  return cQa;
}

function cEt(txt, cBN, bNT) {
  let cts = {
    bLs: 0, nLs: 0, hdg: 0, hrl: 0, itc: 0, eps: 0, mDh: 0,
    emj: 0, eBl: 0, bSc: 0, bHg: 0, eHg: 0, nHg: 0
  }
  const pCt = {
    hdg: CH_HTG, hrl: CH_HRL, itc: CH_ITC, eps: CH_EPS, mDh: CH_EMD, emj: CH_EJ
  }
  for (const [ky, pat] of Object.entries(pCt)) {
    lIx(pat); const m = txt.match(pat); cts[ky] = m ? m.length : 0;
  }
  const { bSC, bHC, eHC, nHC, hLs } = cBd(txt, cBN, bNT),
  { blC, eBlC, ejC } = cBl(txt);
  Object.assign(cts, {
    nLs: cNu(txt), bSc: bSC, bHg: bHC, bLs: blC, eHg: eHC, nHg: nHC, eBl: eBlC
  });
  if (cts.emj > 0) {
    if (ejC > 0) { cts.emj -= ejC };
    if (eHC > 0) { cts.emj -= eHC };
  }
  if (cts.nLs > 0 && hLs > 0) { cts.nLs -= hLs; };
  if (dbg) { console.log(`🆗 COMPLETED: cEt 🆗`); };
  return cts;
}

function cSn(sns) { return sns.map(sn => clp(cTg(sn[0]))); };
function mAr(txt, rx) { return Array.from(txt.matchAll(rx)); };

function mFl(txt, cMs, cWs, hFr) {
  const pns = [CH_EJV, CH_SF, CH_PH, CH_QA];
  pns.forEach(pn => lIx(pn));
  const phM = mAr(txt, CH_PH), qaM = mAr(txt, CH_QA), cQa = mQa(txt),
  env = CH_EJV.exec(txt), snf = CH_SF.exec(hFr);
  const sns = { phs: [], qa: [], snf: null, evj: null, wst: null, mst: null },
  fls = { mst: cMs, wst: cWs };
  for (const [ky, fl] of Object.entries(fls)) { if (fl) sns[ky] = true; };
  if (env) { sns.evj = cTg(env[0]); };
  if (snf) { sns.snf = cTg(snf[1]); };
  if (phM.length) { sns.phs = cSn(phM); };
  if (cQa && qaM.length) { sns.qa = cSn(qaM); };
  if (dbg) { console.log(`🆗 COMPLETED: mFl 🆗`); };
  return sns;
}

function bAR(ck) {
  return {
    url: "https://api.sapling.ai/api/v1/aidetect",
    method: "post",
    contentType: "application/json",
    headers: { "Accept": "application/json", "Accept-Encoding": "gzip" },
    payload: JSON.stringify({ key: __SAPLING_KEY, text: ck, sent_SCRs: false }),
    followRedirects: false,
    muteHttpExceptions: true
  }
}

function rtA(ck) {
  let last = { code: 400, body: "" };
  for (var atpt = 0; atpt < 2; atpt++) {
    if (atpt > 0) { Utilities.sleep(400); };
    const req = bAR(ck), rsps = UrlFetchApp.fetch(req.url, req);
    const code = rsps.getResponseCode(), body = rsps.getContentText();
    last = { code: code, body: body };
    if (code >= 200 && code < 300) { return last; };
    if (code !== 400 || !M_XVL.test(body)) { return last; };
  }
  if (dbg) { console.log(`🆗 COMPLETED: rtA 🆗`) };
  return last;
}

function saE(src) {
  try { return tPt(aDc(src)); } catch (err) {
    if (err.message === "TIMEOUT") return eAT;
    const req = bAR(src), res = UrlFetchApp.fetch(req.url, req),
    code = res.getResponseCode(), log = `🆗 COMPLETED: saE 🆗`;
    if (code < 200 || code >= 300) {
      if (dbg) { console.log(log); }; return eAE;
    } else {
      if (dbg) { console.log(log); }; return eAT;
    }
  }
}

// WORKFLOW FUNCTIONS //

function gMg(e) {
  if (!e || !e.gmail || !e.gmail.accessToken) {
    throw new Error(`⛔ MISSING GMAIL ACCESS TOKEN.`);
  }
  GmailApp.setCurrentMessageAccessToken(e.gmail.accessToken);
  const mId = e.gmail.messageId, msg = GmailApp.getMessageById(mId),
  date = Utilities.formatDate(msg.getDate(), Session.getScriptTimeZone(), "M/d/yyyy h:mm a"),
  sbj = String(msg.getSubject() || "").replace(CL_SJ, "").trim(),
  sdr = dMg(msg.getFrom() || "unknown").replace(CL_SDR, ""),
  rwCn = msg.getBody() || "", rwPn = msg.getPlainBody() || "";
  const dta = { mId, date, sbj, sdr, rwCn, rwPn };
  if (dbg) { console.log(`🆗 COMPLETED: gMg 🆗`); };
  return dta;
}

function pMg(e) {
  const dta = gMg(e);
  let fm, mCn, clH, clP, stl, rwC = dta.rwCn;
  if (szF(rwC, 1024000, "RAW")) { return { ...dta, fm: fSz }; };
  if (btF(rwC.substring(10000, 20000))) {
    return { ...dta, fm: fBt };
  }
  rwC = dMg(rwC); const cmpH = M_HTM.test(rwC);
  let { xH: rwH, xP: rwP } = xHP(rwC);
  rwH = cmpH ? rwH : rwC;
  if (rwP === null) { rwP = dMg(dta.rwPn); };
  if (M_SCH.test(rwH)) {
    if (dev) { console.log(lHS); };
    return { ...dta, fm: fSm };
  }
  const hWc = cWd(rwH), pWc = cWd(rwP);
  if (hWc < 5 && pWc < 5) { return { ...dta, fm: fNC }; };
  ({ out: clH, cMs, cWs, thH } = cHC(rwH, "HTML"));
  clH = clH.replace(CL_DTY, "");
  ({ cnP: clP, thP } = cPC(rwP, "Plain Text"));
  const mpH = CL_DTY.test(rwP) ? true : false;
  if (mpH) { clP = cTg(clP); };
  const isT = (thH || thP) ? true : false;
  if (dbg) { ckL(`📝 HTML`, clH); ckL(`📝 PLAIN TEXT`, clP); };
  ({ h, p, fm: fm } = cnF(clH, clP, isT));
  if (!h && !p) { return { ...dta, fm }; };
  if (h && p && dSm(clH, clP)) {
    if (dev) { console.log(lSm); };
    return { ...dta, fm: fSm };
  }
  const useP = !h && p ? true : false;
  if (useP && dev) { console.log(lNH); };
  const prM = useP ? clP : clH;
  const { bg, bgC } = mBC(prM, dta.sbj, dta.sdr);
  if (dev) {
    ckL("📝 PRECLEAN CONTENT", prM);
    console.log(`❓ BLOG/CO? ${bgC}`);
  }
  const slm = M_SLT.exec(dta.sbj);
  if (slm) {
    stl = true;
    if (dev) { console.log(`💵 SETTLEMENT MATCH: ${slm}`); };
  }
  ({ txt: mCn, hFr } = cHF(prM, stl));
  const sns = mFl(prM, cMs, cWs, hFr), { cBN, bNT } = mBN(hFr);
  if (cBN) { sns.bNm = true; };
  const cts = cEt(prM, cBN, bNT);
  mCn = useP ? stp(mCn) : pCl(mCn, "Postclean");
  const wdC = cWd(mCn);
  if (dev) {
    ckL(`📝 POSTCLEAN CONTENT`, mCn);
    console.log(`📐 SAPLING WORD COUNT: ${wdC}`);
  }
  if (dbg) { console.log(`🆗 COMPLETED: pMg 🆗`); };
  return { ...dta, mCn, bg, bgC, cBN, bNT, cts, sns, wdC };
}

function gPh(src) {
  return src.map(s => {
    const t = String(s || "");
    return CH_PHE.test(t) ? t : `${t}...`;
  }).filter(Boolean);
}

function gCS(dta) {
  const { sbj, sdr, sns, bg, bgC } = dta;
  let { bNm, evj, wst, mst, snf } = sns, phM = null, qMg = null;
  const phS = sns.phs || [], qaS = sns.qa || [], fCs = { ...dta.cts };
  if ((bgC) && !CH_SF2) { bNm = null; };
  if (evj && fCs.emj >= 1) { fCs.emj--; };
  if (M_AZO.test(sbj) || M_AZN.test(sdr)) { fCs.eps = 0 };
  const cln = (t) => t ? clp(t) : null;
  const sfX = cln(snf), evX = cln(evj), sPh = gPh(phS), sQa = gPh(qaS);
  if (sPh.length === 1) {
    phM = `Phrase(s): "${sPh[0]}"`;
  } else if (sPh.length > 1) {
    phM = `Phrase(s):` + sPh.map(s => `${tb}"${s}"`).join("");
  }
  if (sQa.length === 1) {
    qMg = `Q&A: "${sQa[0]}"`;
  } else if (sQa.length > 1) {
    qMg = `Q&A:` + sQa.map(a => `${tb}"${a}"`).join("");
  }
  const rules = [
    { vl: fCs.bHg, lb: 'Bold Headings:', scr: 3 },
    { vl: fCs.eHg, lb: 'Emoji Headings:', scr: 90 },
    { vl: fCs.nHg, lb: 'Numbered Headings:', scr: 10 },
    { vl: fCs.bSc, lb: 'Bold Sentences:', scr: 20 },
    { vl: fCs.bLs, lb: 'Bulleted Lists:', scr: 3 },
    { vl: fCs.eps, lb: 'Ellipses:', scr: 10 },
    { vl: fCs.mDh, lb: 'EM Dashes:', scr: 10 },
    { vl: fCs.eBl, lb: 'Emoji Bullets:', scr: 100 },
    { vl: fCs.emj, lb: 'Emojis:', scr: 50 },
    { vl: fCs.hdg, lb: 'Headings:', scr: 8 },
    { vl: fCs.hrl, lb: 'Horizontal Lines:', scr: 8 },
    { vl: fCs.itc, lb: 'Italics:', scr: 5 },
    { vl: fCs.nLs, lb: 'Numbered Lists:', scr: 3 },
    { vl: bNm, txt: `Bold Name in Signature`, scr: 20 },
    { vl: evX, txt: `Envelope Emoji: ${evX}`, scr: 50 },
    { vl: mst, txt: `Mailsuite Tracking`, scr: 80 },
    { vl: sfX, txt: `Sign-off: "${sfX}"`, scr: 90 },
    { vl: wst, txt: `Wisestamp Signature`, scr: 80 },
    { vl: phM, txt: phM, scr: 70 },
    { vl: qMg, txt: qMg, scr: 70 }
  ];
  const tgr = []; let cSr = 0, pts = 0;
  rules.forEach(r => {
    if (r?.vl) {
      pts++; cSr += r.scr;
      tgr.push(` 🔸 ` + (r.lb ? (r.lb + ` ` + r.vl) : r.txt));
    }
  });
  cSr = Math.min(100, (Math.sqrt(cSr * (pts * 10))));
  if (dev) {
    console.log(`📐 POINTS: ${pts}\n📐 SCANE SUBTOTAL: ${rd2(cSr)}`);
  }
  if (bg) {
    const bDc = cSr * 0.20; cSr -= bDc;
    if (dev) { console.log(`➖ BLOG DISCOUNT: ${rd2(bDc)}`); };
  }
  const fls = {
    phs: phS.length > 0, qa: qaS.length > 0, snf: !!snf,
    bNm: !!bNm, evj: !!evj, wst: !!wst, mst: !!mst, bg, bgC
  }
  const eSp = { phs: phS, qa: qaS, snf: sfX, evj: evX };
  const smy = `🚩 AI ELEMENTS FOUND: 🚩\n` + (tgr.length ? tgr.map(t => t).join("\n") : `None`);
  if (dbg) { console.log(`🆗 COMPLETED: gCS 🆗`); }
  return { smy, tgr, fls, sns: eSp, cts: fCs, cSr };
}

function map(pct) {
  const msgs = [
    { max: 1,   msg: `🎉 ${rsbry}This email was definitely written by a human.${cFt}` },
    { max: 20,  msg: `🎉 ${rsbry}This email was most likely written by a human.${cFt}` },
    { max: 40,  msg: `🆗 ${rsbry}There's a slight chance this email is AI&#8209;generated, but it's probably not.${cFt}` },
    { max: 60,  msg: `❓ ${rsbry}This email might (or might not) be AI&#8209;generated. Your guess is as good as mine.${cFt}` },
    { max: 75,  msg: `⚠️ ${stbry}This email is probably AI&#8209;generated. Use caution.${cFt}` },
    { max: 90,  msg: `🚨 ${stbry}<b>This email is most likely AI&#8209;generated.</b><br />Might I suggest breaking the bot? 😉${cFt}` },
    { max: 100, msg: `🚨 ${stbry}<b>This email is definitely AI&#8209;generated.</b><br />Might I suggest breaking the bot? 😉${cFt}` }
  ];
  for (const m of msgs) {
    if (pct <= m.max) {
      if (dbg) { console.log(`🆗 COMPLETED: map 🆗`); };
      return m.msg;
    }
  }
}

function aDc(src) {
  if (!__SAPLING_KEY) {
    __SAPLING_KEY = PropertiesService.getScriptProperties().getProperty("SAPLING_API_KEY");
    if (!__SAPLING_KEY) throw new Error("Missing SAPLING_API_KEY script property");
  }
  const txt = String(src || "");
  if (!txt) { return 0; };
  const t0 = Date.now(), cks = ckT(txt, 400), req = bAR(cks[0]),
  res = UrlFetchApp.fetch(req.url, req);
  if ((Date.now() - t0) > 5000) {
    if (dev) { console.log(lAT); };
    throw new Error(rTo);
  }
  let rty, num, tol = 0, wtd = 0, code = res.getResponseCode(),
  body = res.getContentText(), rtE = 400 && M_XVL.test(body),
  mch = M_SCR.exec(body), jsn;
  var cEr = `⛔ SAPLING ERROR ${code}: ${body}`;
  try {
    jsn = JSON.parse(body);
  } catch (e) { console.error(cEr); throw new Error(cEr); };
  const rsps = UrlFetchApp.fetchAll(cks.map(function(ck) {
    return bAR(ck);
  }));
  if ((Date.now() - t0) > 5000) {
    if (dev) { console.log(lAT); };
    throw new Error(rTo);
  }
  rsps.forEach(function(res, idx) {
    if ((Date.now() - t0) > 5000) {
      if (dev) { console.log(lAT); };
      throw new Error(rTo);
    }
    if (cks.length === 1) {
      if (code === rtE) { rty = rtA(cks[0]); };
    }
    if (code === rtE) {
      rty = rtA(cks[idx]);
      code = rty.code; body = rty.body;
    }
    if (code < 200 || code >= 300) {
      if (dev) { console.log(`🛑 ${cEr}: SKIPPING SAPLING 🛑`); };
      throw new Error(eAE);
    }
    let raw = null;
    if (mch) {
      raw = mch[1];
    } else {
      try {
        if (typeof jsn.score === "number") {
          raw = jsn.score;
        } else if (jsn.data && typeof jsn.data.score === "number") {
          raw = jsn.data.score;
        } else { raw = null; };
      } catch(e) { raw = null; };
    }
    num = Number(raw);
    if (!Number.isFinite(num) || num < 0) { num = 0; };
    if (num > 1) { num = 1; };
    const fLt = cks[idx].length;
    wtd += num * fLt; tol += fLt;
  });
  if (dbg) { console.log(`🆗 COMPLETED: aDc 🆗`); };
  tol = tol ? (wtd / tol) : 0;
  return cks.length === 1 ? num : tol;
}

function onHomepage(e) {
  const card = CardService.newCardBuilder().setHeader(CardService.newCardHeader().setTitle("scanE"))
    .addSection(CardService.newCardSection().addWidget(CardService.newTextParagraph()
    .setText(`${rsbry}<b>Hi! I'm scanE.</b><br />I scan emails and tell you how likely they are to contain AI-generated content. Open any email to scan it.${cFt}`)));
  if (dbg) { console.log(`🆗 COMPLETED: onHomepage 🆗`) };
  return card.build();
}

function onGmailMessageOpen(e) {
  try {
    var dta = pMg(e);
    if (!dta) { return onHomepage(e); };
    if (dta.fm) {
      const out = { pct: null, message: null, fm: dta.fm };
      return bCd(out, dta.sbj, dta.sdr, dta.date, null, null, dta.mId, null);
    }
    let cFS, ch;
    if (szF(dta.mCn, 512000, "SCANE")) {
      ch = {}; cFS = fCZ;
    } else { ch = gCS(dta); cFS = rd2(ch.cSr); };
    let out, aFS, spCn = dta.mCn;
    if (dta.wdC < 100) {
      aFS = fWc; const elmts = map(cFS);
      if (dev) {
        console.log(`🛑 WORD COUNT (${dta.wdC} words): SKIPPING SAPLING 🛑`);
      }
      out = { pct: cFS, message: elmts, details: ch.smy || "" };
    } else {
      let avgScr; aFS = saE(spCn); cFS = Math.min(100, cFS);
      const mNo = (n) => typeof n === 'number', cSc = mNo(cFS), aSc = mNo(aFS);
      const chs = [
        { ch: !cSc && aSc, scr: aFS },
        { ch: cSc && !aSc, scr: cFS },
        { ch: cSc && aSc, scr: (cFS + aFS) / 2 },
        { ch: cSc && aSc && cFS === 0, scr: aFS / 2 },
        { ch: cSc && aSc && aFS === 0, scr: cFS / 2 },
      ];
      const calc = chs.find(c => c.ch);
      avgScr = calc ? calc.scr : 0;
      out = { pct: rd2(avgScr), message: map(avgScr), details: ch.smy || "" };
    }
    if (dev) { console.log(out.details); };
    if (dbg) { console.log(`🆗 COMPLETED: onGmailMessageOpen 🆗`); }
    return bCd(out, dta.sbj, dta.sdr, dta.date, aFS, cFS, dta.mId, null);
  } catch (err) { return bEC(err); }
}

function bCd(out, sbj, sdr, date, aFS, cFS, mid, tid) {
  const cHdr = CardService.newCardHeader()
    .setTitle(`${rsbry}scanE - Gmail™ AI Content Scanner${cFt}`)
    .setSubtitle('Developed by Teddy Did It Development 🐻');
  const cMta = CardService.newCardSection()
    .addWidget(CardService.newKeyValue().setTopLabel(`${rsbry}Subject:${cFt}`).setContent(sbj).setMultiline(true))
    .addWidget(CardService.newKeyValue().setTopLabel(`${rsbry}From:${cFt}`).setContent(sdr).setMultiline(true))
    .addWidget(CardService.newKeyValue().setTopLabel(`${rsbry}Date:${cFt}`).setContent(date));
  const cDta = CardService.newCardSection().setHeader(`${rsbry}<b>Scan Results</b>${cFt}`);
  const cRst = [];
  if (out && out.fm) { cRst.push(CardService.newTextParagraph().setText(out.fm)); }
  if (out && out.pct != null) {
    let cSX = ""; let aSX = "";
    if (typeof cFS === 'number') {
      cSX = `${bkbry}<b>▸ ${cFS}%</b>${cFt}`;
    } else { cSX = `${bkbry}<b>▸ </b>${cFt}${cFS}`; };
    if (typeof aFS === 'number') {
      aSX = `${bkbry}<b>▸ ${aFS}%</b>${cFt}`;
    } else { aSX = `${bkbry}<b>▸ </b>${cFt}${aFS}`; };
    cRst.push(CardService.newTextParagraph()
      .setText(`${bkbry}<b>scanE Score</b>${cFt}<br /><em>(Level 1: phrases, formatting, punctuation, emojis, email tracking)</em>`));
    cRst.push(CardService.newTextParagraph().setText(cSX));
    cRst.push(CardService.newTextParagraph()
      .setText(`${bkbry}<b>Sapling Score</b>${cFt}<br /><em>(Level 2: tone, style, word choice, phrasing, sentence structure)</em>`));
    cRst.push(CardService.newTextParagraph().setText(aSX));
    cRst.push(CardService.newTextParagraph().setText(`${rsbry}<b>⭐FINAL SCORE: ${out.pct}%⭐</b>${cFt}`));
  }
  if (out && out.message) { cRst.push(CardService.newTextParagraph().setText(`${out.message}`)); };
  cRst.forEach(w => cDta.addWidget(w));
  const bdr = CardService.newCardBuilder().setHeader(cHdr).addSection(cMta);
  if (cRst.length > 0) { bdr.addSection(cDta); }
  if (out && out.pct !== null) {
    const cDmr = CardService.newCardSection().addWidget(CardService.newTextParagraph()
      .setText(`${bkbry}<em>Powered by Sapling's AI Detector</em><strong>:</strong> <em>Over&nbsp;97%&nbsp;accurate.</em>${cFt}`));
    bdr.addSection(cDmr);
  }
  if (dbg) { console.log(`🆗 COMPLETED: bCd 🆗`); };
  if (dev) { console.log(`🎉 SUCCESS! 🎉`); };
  return bdr.build();
}

function bEC(err) {
  const eMg = (err && err.message) ? err.message : String(err),
  crd = CardService.newCardHeader().setTitle("scanE - Gmail™ AI Content Scanner").setSubtitle("Error"),
  cErr = CardService.newCardSection().addWidget(CardService.newTextParagraph()
    .setText(`${stbry}<em><b>Sorry!</b></em> That didn't work. 😕<br />${eMg}${cFt}`));
  return CardService.newCardBuilder().setHeader(crd).addSection(cErr).build();
}
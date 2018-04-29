class StringUtils {
    constructor(encode) {
        this.validator = function (c) { return (c >= 0x0 && c < 0x81) || (c == 0xa0) || (c >= 0xa1 && c < 0xdf) || (c >= 0xfd && c < 0xff); };
        if (encode && encode !== '') {
            if (encode.match(/^(SJIS|Shift[_\-]JIS)$/i)) {
                this.validator = function (c) { return (c >= 0x0 && c < 0x81) || (c == 0xa0) || (c >= 0xa1 && c < 0xdf) || (c >= 0xfd && c < 0xff); };
            } else if (encode.match(/^(UTF-?8)$/i)) {
                this.validator = function (c) { return (c >= 0x0 && c < 0x81) || (c == 0xf8f0) || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4); };
            }
        }
    }

    strLength(str) {
        let count = 0;
        let c = '';

        for (var i = 0, len = str.length; i < len; i++) {
            c = str.charCodeAt(i);
            count += this.stringCounter(c)
        }
        return count;
    }

    strPick(elm, limit) {
        let count = 0;
        let c = '';

        for (var i = 0, len = elm.length; i < len; i++) {
            c = elm.charCodeAt(i);
            if (this.stringCounter(c) == limit) {
                return c;
            }
        }
        return '';
    }

    stringCreater(str, limit, elements) {
        while (this.strLength(str) <= limit) {
            var randomize = Math.floor(Math.random() * (elements.length - 1));
            const result = elements.charAt(randomize);
            if (this.strLength(str + result) > limit) {
                break;
            }
            str += result;
        };
        return str;
    }

    stringCounter(c) {
        if (this.validator(c)) {
            return 1;
        } else {
            return 2;
        }
    }
}

class Query {
    constructor(query) {
        this.query = query;
    }
    get() {
        return `(function get(){
            console.log("get");
            return ${this.query};
        })();`;
    }

    exe() {
        return `(function exe(){
            console.log("exe:escape_html");
            ${this.query};
        })();`;
    }
}


const type = {
    hankakuSAlphabet: "abcdefghijklmnopqrstuvwxyz",
    hankakuLAlphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    hankakuSuuji: "0123456789",
    hankakuKatakana: "ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝﾞﾟ",
    hankakuKigou: "!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~",
    zenkakuSAlphabet: "ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗｘｙｚ",
    zenkakuLAlphabet: "ＡＢＣＤＥＦＧＨＩＪＫＬＭＮＯＰＱＲＳＴＵＶＷＸＹＺ",
    zenkakuSuuji: "０１２３４５６７８９",
    zenkakuKatakana: "ァアィイゥウェエォオカガキギクグケゲコゴサザシジスズセゼソゾタダチヂッツヅテデトドナニヌネノハバパヒビピフブプヘベペホボポマミムメモャヤュユョヨラリルレロヮワヰヱヲンヴヵヶ",
    zenkakuHiragana: "ぁあぃいぅうぇえぉおかがきぎくぐけげこごさざしじすずせぜそぞただちぢっつづてでとどなにぬねのはばぱひびぴふぶぷへべぺほぼぽまみむめもゃやゅゆょよらりるれろゎわゐゑをん",
    zenkakuKigou: "　、。，．・：；？！゛゜´｀¨＾￣＿ヽヾゝゞ〃仝々〆〇ー―‐／＼～∥｜…‥‘’“”（）〔〕［］｛｝〈〉《》「」『』【】＋－±×÷＝≠＜＞≦≧∞∴♂♀°′″℃￥＄￠￡％＃＆＊＠§☆★○●◎◇◆□■△▲▽▼※〒→←↑↓〓∈∋⊆⊇⊂⊃∪∩∧∨￢⇒⇔∀∃∠⊥⌒∂∇≡≒≪≫√∽∝∵∫∬Å‰♯♭♪ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψωАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя─│┌┐┘└├┬┤┴┼━┃┏┓┛┗┣┳┫┻╋┠┯┨┷┿┝┰┥┸╂｡｢｣､･①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳ⅠⅡⅢⅣⅤⅥⅦⅧⅨⅩ㍉㌔㌢㍍㌘㌧㌃㌶㍑㍗㌍㌦㌣㌫㍊㌻㎜㎝㎞㎎㎏㏄㎡　㍻〝〟№㏍℡㊤㊥㊦㊧㊨㈱㈲㈹㍾㍽㍼≒≡∫∮∑√⊥∠∟⊿∵∩∪"
};

const typeName = [
    "半角小文字アルファベット",
    "半角大文字アルファベット",
    "半角数字",
    "半角カタカナ",
    "半角記号",
    "全角小文字アルファベット",
    "全角大文字アルファベット",
    "全角数字",
    "全角カタカナ",
    "全角ひらがな",
    "全角記号",
    "複合"
];
const stringUtils = new StringUtils();
{
    //We have permission to access the activeTab, so we can call chrome.tabs.executeScript:
    chrome.tabs.executeScript({
        code: new Query('document.body.innerHTML').get() //argument here is a string but function.toString() returns function's code
    }, (results) => {
        var tag = document.createElement("div")
        tag.innerHTML = results;
        var arr = Array.from(tag.getElementsByTagName('*'));
        arr.forEach((elm) => {
            if (!!elm.name && elm.style.display != 'none') {
                const val = document.createElement("option");
                val.value = elm.name;
                val.innerText = elm.name;
                document.getElementById("target").appendChild(val);
            }
        });
    });
}

document.getElementById('target').addEventListener('change', eve => {
    const name = eve.target.value;
    const get = new Query(`JSON.stringify(document.getElementsByName('${name}')[0].getBoundingClientRect())`);
    ContrastCanvas.deleteCanvas();
    chrome.tabs.executeScript({
        code: get.get()
    }, (results) => {
        chrome.tabs.executeScript({
            code: `${new Query(ContrastCanvas.createCanvas(JSON.parse(results))).exe()};`
        });
    });
});

document.getElementById('seisei').addEventListener('click', event => {
    var val = document.getElementsByName("horizon")[0].value;
    if (val.length <= 0 || isNaN(val)) {
        return;
    }
    var arr = makeString(Number(val)).concat(makeString2(Number(val)));
    var btnArr = [];
    var obj = arr.map(function (string, index) {
        btnArr.push(typeName[index] + 'Button');
        return "<h4 style='margin-bottom: 0; margin-top:0'>" + typeName[index] + "</h4><input id='" + typeName[index] + "' style='width:" + (Number(val)) + "rem;' value='" + escape_html(string) + "'><button id='" + typeName[index] + "Button'>反映</button><br/>";
    });
    document.getElementById("result").innerHTML = obj.join("");

    btnArr.forEach(function (id) {
        document.getElementById(id).addEventListener('click', event => {
            var val = document.getElementById(event.target.id.substr(0, event.target.id.indexOf("Button"))).value;
            var target = document.getElementsByName("target")[0].value;
            chrome.tabs.executeScript(null, {
                code: new Query(`document.getElementsByName('${target}')[0].value = unescape('${escape(val)}');`).exe()
            });
        })
    });
}, false);

window.addEventListener('blur', () => {
    ContrastCanvas.deleteCanvas();
});

class ContrastCanvas {
    static createCanvas(json) {
        return `let dyCanvas =  document.createElement('canvas');
        dyCanvas.width=${json.width};
        dyCanvas.height=${json.height};
        dyCanvas.style.width='${json.width}px';
        dyCanvas.style.height='${json.height}px';
        dyCanvas.style.position='absolute';
        dyCanvas.style.top ='${json.top}px';
        dyCanvas.style.left='${json.left}px';
        dyCanvas.style.backgroundColor='rgba(0, 128, 0, 0.2)';
        dyCanvas.style.border='solid 1px rgba(0, 0, 255, 1)';
        dyCanvas.style.boxSizing='border-box';
        var ctx = dyCanvas.getContext('2d');
        ctx.rect(0,0,${json.width},${json.height});
        ctx.stroke();
        document.body.appendChild(dyCanvas);
        `;
    }

    static deleteCanvas() {
        const exe = new Query("\
        Array.from(document.getElementsByTagName('canvas')).forEach(elm => {\
        elm.parentNode.removeChild(elm)\
        })");
        chrome.tabs.executeScript(null, {
            code: `{
            ${exe.exe()};
        }`
        });
    }
}



function makeString(limit) {
    return Object.keys(type).map((key => {
        return stringUtils.stringCreater("", limit, type[key]);
    }));
}

function makeString2(limit) {
    const arr = Array.from(document.getElementsByTagName('input')).filter((elm) => {
        return elm.checked
    });
    if (arr.length < 1) {
        return;
    }
    const bool = arr.length > limit;
    const types = arr.map((elm) => {
        return type[elm.value];
    });



    const targetType = types.join("");
    let str = '';
    if (bool) {
        while (stringUtils.strLength(str) <= limit) {
            str += stringUtils.stringCreater(str, limit, targetType);
        };
        if (str.length < limit) {
            str += stringUtils.strPick(targetType, limit - str.length);
        }
    } else {
        let num = types.length;
        const itemsPick = (limit / num | 0);
        types.forEach((elm) => {
            str += stringUtils.stringCreater("", itemsPick, elm);
        });
        str = stringUtils.stringCreater(str, limit, targetType);
        if (stringUtils.strLength(str) < limit) {
            str += stringUtils.strPick(targetType, limit - stringUtils.strLength(str));
        }
    }
    return str;
}

function stringCreater(str, limit, elements) {
    while (strLength(str) <= limit) {
        var randomize = Math.floor(Math.random() * (elements.length - 1));
        const result = elements.charAt(randomize);
        if (strLength(str + result) > limit) {
            break;
        }
        str += result;
    };
    return str;
}

function escape_html(string) {
    return string.replace(/[&'`"<>]/g, function (match) {
        return {
            '&': '&amp;',
            "'": '&#x27;',
            '`': '&#x60;',
            '"': '&quot;',
            '<': '&lt;',
            '>': '&gt;',
        }[match];
    });
}


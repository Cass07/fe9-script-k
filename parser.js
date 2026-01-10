/**
 * script 파일을 각 command 단계로 파싱하고
 * 파싱한 이후 커멘드를 절차적으로 읽어 실제 게임 내 스크립트 출력대로 script를 출력하는 모듈
 *
 * input : raw script file (txt)
 * output : json format, list of {id, index, name, script}
 *
 *
 *
 */


(function (window) {
    function PARSER_FE9() {

        let _parser = {};

        let _private_parser = {};

        const PID_DICT = {
            "MAP2_CITIZEN": "시민",
            "MAP4_HORSE": "말",
            "ACTORMANQUE": "되다 만 것",
            "ALDER": "알더",
            "AMLITA": "암리타",
            "AMLITA_EV": "EVアムリタ",
            "AMY": "에이미",
            "ANNA": "안나",
            "APOSTLE": "정의 장교",
            "APOSTLE2": "정의 사도",
            "APOSTLEARMOR": "정의 갑장",
            "APOSTLEBLADE": "정의 검사",
            "APOSTLEFIGHTER": "정의 도끼술사",
            "APOSTLEKNIGHT": "정의 기장",
            "APOSTLEPRIEST": "정의 신관장",
            "ASHNARD": "아슈나드",
            "ASTARTE": "아스타르테",
            "ASTATUNU": "아스타튜느",
            "BANDITS1": "산적단",
            "BANDITS2": "해적단",
            "BEGNION": "제국병",
            "BEGNION2": "제국 장교",
            "BEGNIONARMOR": "제국 중갑병",
            "BEGNIONARMOR2": "제국 중갑장",
            "BEGNIONBKNIGHT": "제국 천마 기병",
            "BEGNIONDKNIGHT": "제국 용 기병",
            "BEGNIONDKNIGHT2": "제국 용 기장",
            "BEGNIONKNIGHT": "제국 기병",
            "BEGNIONKNIGHT2": "제국 기장",
            "BEGNIONMAGE": "제국 마도병",
            "BEGNIONMAGE2": "제국 마도장",
            "BEGNIONMERCENARY": "제국군 용병",
            "BEGNIONPKNIGHT2": "제국 천마 기장",
            "BEGNIONPRIEST": "제국 신관병",
            "BEGNIONPRIEST2": "제국 신관장",
            "BEGNIONSOLDIER": "베그니온병",
            "BEGNION_C": "베그니온 문관",
            "BEGNION_FIRE": "공작병",
            "BEGNION_L": "베그니온 여성",
            "BEJONA": "베요나",
            "BEUFORRES": "베우포레스",
            "BOLE": "보레",
            "BONARD": "보나드",
            "BOY": "남자아이",
            "BRAD": "브래드",
            "BURAISU": "브라이스",
            "B_MESSENGER": "제국의 사자",
            "CAHITALENO": "카히탈리노",
            "CAINEGHIS": "카이네기스",
            "CALILL": "카릴",
            "CEPHERAN": "세페란",
            "CEPHERAN_EV": "EV세페란",
            "CHAP": "채프",
            "CHINON": "시논",
            "CLUPEA": "클루베아 공작군",
            "CRIMEA": "크리미아병",
            "CRIMEA2": "크리미아 장교",
            "CRIMEAARMOR": "크리미아 중갑병",
            "CRIMEAARMOR2": "크리미아 중갑교",
            "CRIMEAKNIGHT": "크리미아 기병",
            "CRIMEAKNIGHT2": "크리미아 기장",
            "CRIMEAMAGE": "크리미아 마도병",
            "CRIMEAMAGE2": "크리미아 마도장",
            "CRIMEAMERCENARY": "크리미아군 용병",
            "CRIMEAPRIEST": "크리미아 신관병",
            "CRIMEAPRIEST2": "크리미아 신관장",
            "CRIMEA_REBEL": "크리미아 반란군",
            "CRIMEA_REBRL": "크리미아 반란병",
            "DALAHOWE": "다라하우",
            "DANIEL": "다니엘",
            "DARKKNIGHT": "칠흑의 기사",
            "DAYNE": "데인병",
            "DAYNE2": "데인 장교",
            "DAYNEARMOR": "데인 중갑병",
            "DAYNEARMOR2": "데인 중갑장",
            "DAYNEDKNIGHT": "데인 용 기병",
            "DAYNEDKNIGHT2": "데인 용 기장",
            "DAYNEKNIGHT": "데인 기병",
            "DAYNEKNIGHT2": "데인 기장",
            "DAYNEMAGE": "데인 마도병",
            "DAYNEMAGE2": "데인 마도장",
            "DAYNEMERCENARY": "데인군 용병",
            "DAYNEPRIEST": "데인 신관병",
            "DAYNEPRIEST2": "데인 신관장",
            "DAYNE_LIBER": "데인 해방군",
            "DEATH": "데스",
            "DENT": "덴트",
            "DHEGINHANSEA": "데긴핸저",
            "DUD": "되다 만 것",
            "DUMMY": "???",
            "DZUR": "주르",
            "EDDIE": "에디",
            "ELAICE": "이레이스",
            "ELENA": "에르나",
            "ELENA_EV": "EV에르나",
            "ENA": "이나",
            "ERINCIA": "엘린시아",
            "ERINCIA2": "엘린시아",
            "ERLAN": "에를란",
            "FERERE": "페리레",
            "FIGHTER": "용병",
            "FIRESPIRIT": "화염의 정령",
            "FRIEDA": "프리다",
            "F_DAYNE": "전 데인병",
            "GALIA": "갈리아병",
            "GATRIE": "가트리",
            "GAWAIN": "가웨인",
            "GEOFFRAY": "제프리",
            "GIFFCA": "지프카",
            "GIRL": "여자아이",
            "GOLDOA": "고르드아병",
            "GORAN": "게랑",
            "GORT": "고트",
            "GRANDMA": "할머니",
            "GRANDPA": "할아버지",
            "GREIL": "그레일",
            "GREIL3": "그레일",
            "GREIL_EV": "EV그레일",
            "GRITZ": "그리츠",
            "HAAR": "하알",
            "HEATHER": "헤더",
            "HELL": "헬",
            "HETZEL": "헤첼",
            "IKE": "아이크",
            "IKE2": "아이크",
            "IKE_2EV": "EV아이크&미스트",
            "IKE_3EV": "EV어린 아이크",
            "IKE_4EV": "EV어린 아이크&미스트",
            "IKE_EV": "EV아이크&미카야",
            "INSPECTOR": "감찰관",
            "ISAIYA": "이사이야",
            "ITOTS": "이토츠",
            "IZCA": "이즈카",
            "JACOB": "야곱",
            "JANAFF": "야나프",
            "JELD": "젤드",
            "JILL": "질",
            "JILL_EV": "EV질",
            "JORGE": "조지",
            "KAZISA": "카지자",
            "KEVIN": "케빈",
            "KEZHDA": "케즈다",
            "KILROY": "킬로이",
            "KILVAS": "키르바스병",
            "KISA": "키사",
            "KURTH": "쿠르트",
            "KURTHNAGA": "쿠르트나가",
            "LABERTHON": "라벨톤",
            "LADY": "아주머니",
            "LAGUS": "라구즈 해방군",
            "LALOMI": "야로미",
            "LARABEL": "라라벨",
            "LARGO": "라르고",
            "LAURA": "로라",
            "LAY": "라이",
            "LEARNE": "리아네",
            "LEKAIN": "루칸",
            "LENING": "레닝",
            "LENING_EV": "EV레닝",
            "LEONARDO": "레오나르도",
            "LILEA": "릴리아",
            "LIRE": "리레",
            "LOFA": "요파",
            "LOMBROSO": "롬브로소",
            "LORAZIEH": "로라이제",
            "LORD_DUMMY": "귀족",
            "LUCHINO": "루키노",
            "MAID": "하인",
            "MAKAROV": "마카로프",
            "MAP5_ENEMY": "MAP5적",
            "MAP9_PRISONER": "포로",
            "MARADKNIGHT": "마라드 기사",
            "MARCIA": "마샤",
            "MARJO": "마조우",
            "MEG": "메그",
            "MERCENARYS": "용병단",
            "MESSENGER": "사자",
            "MICAIAH": "미카야",
            "MICAIAH_EV": "EV미카야&라피엘",
            "MISAHA": "미사하",
            "MIST": "미스트",
            "MISTER": "아저씨",
            "MORDY": "모우디",
            "MUSTON": "무스톤",
            "MWARIM": "무와림",
            "MYSTERYMAN": "의문의 남성",
            "NABE": "네이베",
            "NAESALA": "네사라",
            "NAESALA_EV": "EV네사라",
            "NASIR": "나시르",
            "NEALUCHI": "니알루치",
            "NEPHENEE": "네페니",
            "NICO": "니코",
            "NIKE": "니케",
            "NOSE": "노즈",
            "NOYCE": "노이스",
            "NUMIDA": "누미다",
            "OLIVER": "올리버",
            "OLTINA": "오르티나",
            "OLUGH": "오르그",
            "OSCAR": "오스카",
            "PELLEAS": "펠레아스",
            "PHOENICIS": "페니키스병",
            "PKNL": "천마 기사",
            "PRAGUE": "프라하",
            "PUGO": "푸고",
            "RADMIM": "라드밈",
            "RAFIEL": "라피엘",
            "RAJAION": "라자이온",
            "RAMBEGA": "람비가",
            "RAO": "라오",
            "REBELLION": "반란병",
            "REBELLION2": "반란군 장교",
            "REBELLIONARMOR": "반란군 중갑병",
            "REBELLIONARMOR1": "#X36반란군 지원 중갑병#x",
            "REBELLIONARMOR2": "반란군 중갑장",
            "REBELLIONKNIGHT": "반란군 기병",
            "REBELLIONKNIGHT2": "반란군 기장",
            "REBELLIONKNIGHT3": "#X36반란군 지원 기병#x",
            "REBELLIONMAGE": "반란군 마도병",
            "REBELLIONMAGE2": "반란군 마도장",
            "REBELLIONMERCENARY": "반란군 용병",
            "REBELLIONPRIEST": "반란군 신관병",
            "REBELLIONPRIEST2": "반란군 신관장",
            "REBELLIONVOLUNTEER": "반란군 지원병",
            "RETAINER": "여신의 권속",
            "RETHE": "레테",
            "RIEUSION": "뤼시온",
            "ROBBERS": "강도단",
            "ROMMITANA": "로미타나",
            "RUBALE": "르베르",
            "RUDBECK": "루드벡",
            "SANAKI": "사나키",
            "SCOUNDREL": "불량배",
            "SENATOR": "원로원 의원",
            "SENERIO": "세네리오",
            "SERGEI": "세르게이",
            "SIDIAU": "시지오우",
            "SIGRUN": "시그룬",
            "SKRIMIR": "스크리밀",
            "SOANEVALCKE": "손바르케",
            "SOTHE": "소더",
            "SOTHE_2EV": "EV소더B",
            "SOTHE_EV": "EV소더",
            "STELLA": "스텔라",
            "TABASA": "타바사",
            "TANIS": "타니스",
            "TASHJORIA": "타시요리아",
            "TAURONEO": "타우로니오",
            "TAURONEO_EV": "EV타우로니오",
            "THUNDERSPIRIT": "번개의 정령",
            "TIAMAT": "티아마트",
            "TIBARN": "티반",
            "TIBARN_2EV": "EV티반&소더",
            "TIBARN_EV": "EV티반",
            "TOPUCK": "토팍",
            "TUT_1": "아군병",
            "TUT_2": "적군병",
            "TUT_3": "기타병",
            "TUT_4": "우군병",
            "TU_SOL": "병사",
            "ULYSSES": "율리시스",
            "UNKNOWN": "상관도 얼굴 없음",
            "VALTELOME": "발테로메",
            "VIZE": "비제",
            "VOLKE": "폴카",
            "VULCI": "우르키",
            "WAYU": "와유",
            "WAZECACA": "와제카카",
            "WINDSPIRIT": "바람의 정령",
            "WUHALADA": "우하라다",
            "XXXXX": "【미정】",
            "YEARDLEY": "야들리",
            "YOUNGLADY": "마을 처녀",
            "YOUNGMAN": "청년",
            "YUMA": "유마",
            "YUNE": "윤느",
            "YUNNU": "윤느",
            "ZAITAN": "자이탄",
            "ZEFFREN": "제프렌",
            "ZELGIUS": "제르기우스",
            "ZELGIUS_EV": "EV제르기우스",
            "ZIHARK": "치하크",

        };

        const UNUSED_COMMANED = [
            /\[Scene=([^\]]*)\]/gm,
            /\[LoadBackground=([^\]]*)\]/gm,
            /\[FaceCommand=([^\]]*)\]/gm,
            /\[Pause=([^\]]*)\]/gm,
            /\[ClearBox\]/gm,
            /\[FreezeMouth\]/gm,
            /\[UnfreezeMouth\]/gm,
            /\[X\]/gm,
            /\[ClearTarget=([^\]]*)\]/gm,
            /\[Fade=([^\]]*)\]/gm,
            /\[Trigger\]/gm,
            /(?!\$c)\$[0-9a-zA-Z$]*/gm,
        ];

        let REPLACE_COMMAND = [
            {
                "regex": /#F01/gm,
                "replace": "("
            },
            {
                "regex": /#F02/gm,
                "replace": ")"
            },
        ];

        let global_face_memory = [];
        let global_s_target = -1;

        const USED_COMMAND = [
            {
                // 페이스 메모리에 읽은 face id를 저장
                "command": /\[Face='([^\]]*)' Pos='([^\]]*)'\]/gm,
                "handler": function (match) {
                    global_face_memory[match[2]] = match[1];
                    global_s_target = match[2];
                    return null;
                }
            },
            {
                // 페이스 메모리에 읽은 face id를 저장
                "command": /\[LoadPortrait_[LS]=([^\]]*)\]/gm,
                "handler": function (match) {
                    global_face_memory[global_s_target] = match[1];
                    return null;
                }
            },
            {
                // 페이스 메모리에 읽은 face id를 저장
                "command": /\$c([0-9])(.*)a\|/gm,
                "handler": function (match) {
                    global_face_memory[match[1]] = match[2];
                    return null;
                }
            },
            {
                // S_target 명령어를 읽어서 현재 가리키는 face memory 주소를 저장
                "command": /\[[SF]_Target=([^\]]*)\]/gm,
                "handler": function (match) {
                    global_s_target = match[1];
                    return null;
                }
            },
            {
                // [A] 명령어를 읽어서 다음 메시지 박스임을 표시
                "command": /(.*)\[A\]/gm,
                "handler": function (match) {
                    return match[1];
                }
            }
        ];

        _private_parser.getFaceName = function (s_target_curser) {
            if(s_target_curser === undefined || s_target_curser === null) {
                return "-";
            }
            if (global_face_memory[s_target_curser] in PID_DICT) {
                return PID_DICT[global_face_memory[s_target_curser]];
            }
            return global_face_memory[s_target_curser];
        }

        _private_parser.addScriptLine = function (result, current_id, result_index, name, line) {
            if (result.length === 0 || result.length === result_index) {
                result.push({
                    "id": current_id,
                    "index": result_index,
                    "name": _private_parser.getFaceName(global_s_target),
                    "script": line.trim()
                });
            } else {
                result[result_index]["script"] += "<br>" + line.trim();
            }
        }

        _private_parser.initialize = function() {
            global_face_memory = [];
            global_s_target = -1;
        }

        _parser.parseScript = function (raw_script) {
            let parsed_script = raw_script;
            _private_parser.initialize();

            // 사용하지 않는 커맨드 제거
            UNUSED_COMMANED.forEach(cmd_regex => {
                parsed_script = parsed_script.replaceAll(cmd_regex, "");
            });

            // 치환 커맨드 적용
            REPLACE_COMMAND.forEach(replace_obj => {
                parsed_script = parsed_script.replaceAll(replace_obj.regex, replace_obj.replace);
            });

            // ]문자 뒤로 줄바꿈 추가
            parsed_script = parsed_script.replaceAll(/\]/gm, "]\n");
            parsed_script = parsed_script.replaceAll(/\|/gm, "|\n");

            // raw text를 array로 변환
            let lines = parsed_script.split(["\n"]);


            let result = [];
            let result_index = 0;
            let if_matched = false;
            let current_id = "";
            // lines 배열을 순서대로 순회하며 맞는 커멘드 실행
            lines.forEach(line => {
                if_matched = false;
                USED_COMMAND.forEach(cmd_obj => {
                    let match = cmd_obj.command.exec(line);
                    if (match) {
                        if_matched = true;

                        cmd_obj.command.lastIndex = 0; // reset regex state
                        let result_val = cmd_obj.handler(match);

                        if (result_val !== undefined && result_val !== null) {
                            _private_parser.addScriptLine(result, current_id, result_index, _private_parser.getFaceName(global_s_target), result_val);
                            // [A} 커맨드 이후로는 새로운 인덱스로
                            result_index++;
                        }
                    }
                });
                if (!if_matched && line.trim() !== "") {
                    // M으로 시작하는 문자열이라면 current id 임
                    if (line.trim().startsWith("M")) {
                        current_id = line.trim();
                        result.push({
                            "id": current_id,
                            "index": result_index++,
                            "name": "",
                            "script": current_id
                        });
                        // 이름사전 리셋
                        _private_parser.initialize();
                    } else {
                        _private_parser.addScriptLine(result, current_id, result_index, _private_parser.getFaceName(global_s_target), line);
                    }

                    // 커멘드가 아닌 일반 텍스트인 경우 결과에 추가
                    //result[result_index]["script"] += line.trim() + "\n";

                }
            });

            return result;
        };


        return _parser;
    }

    if (typeof window.PARSER_FE9 === "undefined") {
        window.PARSER_FE9 = new PARSER_FE9();
    }
})(window);
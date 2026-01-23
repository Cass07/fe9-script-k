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
            "3BROTHERS" : "삼 형제",
            "ACTORMANQUE" : "되다 만 것",
            "ANNA" : "안나",
            "ANTIQUE" : "조지",
            "ARISTOCRAT" : "귀족",
            "ASHNARD" : "아슈나드",
            "ASHNARD2" : "아슈나드",
            "ASTARTE" : "아스타르테",
            "BANDIT1" : "산적",
            "BANDIT2" : "산적",
            "BANDIT3" : "해적",
            "BANDIT4" : "해적",
            "BANDIT7" : "행상단",
            "BANDIT8" : "행상단",
            "BANDIT_MOU" : "산적",
            "BANDIT_SEA" : "해적",
            "BARUMA" : "바르마",
            "BEGNION1" : "베그니온병",
            "BEGNION2" : "베그니온병",
            "BEGNIONB" : "문관",
            "BEUFORRES" : "베우포레스",
            "BISHOP" : "사제",
            "BLACKKNIGHT" : "칠흑의 기사",
            "BOLE" : "보레",
            "BOSS" : "데인 장군",
            "BOY" : "남자아이",
            "BROTHER" : "남매",
            "BROTHER2" : "남매",
            "BROTHER3" : "할아비",
            "BURAISU" : "브라이스",
            "B_BOSS" : "베그니온 장군",
            "B_OFFICER" : "베그니온 장교",
            "B_ZAKO" : "베그니온병",
            "CAINEGHIS" : "카이네기스",
            "CALILL" : "카릴",
            "CAT" : "갈리아병",
            "CATWOMAN" : "여성",
            "CEPHERAN" : "세페란",
            "CEPHERAN2" : "세페란",
            "CEPHERAN_FAKE" : "좋은 사람 세페란",
            "CHAP" : "채프",
            "CHIGU" : "시커",
            "CHINON" : "시논",
            "CONFIDENCE" : "신뢰",
            "CRIMEA1" : "크리미아병",
            "CROW" : "키르바스병",
            "C_BOSS" : "크리미아 장군",
            "C_ZAKO" : "크리미아병",
            "DAKKOWA" : "닥코와",
            "DALAHOWE" : "다라하우",
            "DANOMIRU" : "다노미르",
            "DARKKNIGHT" : "칠흑의 기사",
            "DAYNE" : "데인병",
            "DAYNE1" : "데인병",
            "DAYNE2" : "데인병",
            "DAYNE3" : "데인병",
            "DAYNE_MER" : "데인 용병",
            "DEPUTY" : "부관",
            "DHEGINHANSEA" : "데긴핸저",
            "DINE_BOSS" : "데인 장군",
            "DUMMY" : "???",
            "D_ZAKO_11" : "경비",
            "ELAICE" : "이레이스",
            "ELENA" : "에르나",
            "EMAKOU" : "에마코우",
            "ENA" : "이나",
            "ENA2" : "이나",
            "ERINCIA" : "엘린시아",
            "ERINCIA2" : "엘린시아",
            "ERINCIA_PRINCESS" : "엘린시아",
            "ERINCIA_QUEEN" : "엘린시아·여왕",
            "FALCON_TEAM" : "성천마 기사",
            "FRIEND" : "동료",
            "F_BOSS" : "페니키스 장군",
            "F_TEAM" : "페니키스단",
            "F_ZAKO" : "페니키스병",
            "GASIRAMA" : "가시라마",
            "GATRIE" : "가트리",
            "GEOFFRAY" : "제프리",
            "GIFFCA" : "지프카",
            "GIRL" : "여자아이",
            "GORT" : "고트",
            "GRANDMA" : "할머니",
            "GRANDPA" : "할아버지",
            "GREIL" : "그레일",
            "GREIL2" : "그레일",
            "GREIL3" : "그레일",
            "GREIL_MAP1" : "1면용 그레일",
            "GREIL_TEAM" : "그레일 용병단",
            "GURAISU" : "그라이스",
            "GURORMERU" : "그로멜",
            "G_BOSS" : "갈리아 장군",
            "G_ZAKO" : "갈리아병",
            "HAAR" : "하알",
            "HAHUXEDO" : "하페드",
            "HAWK" : "페니키스병",
            "HEATHER" : "헤더",
            "HETZEL" : "헤첼",
            "HIBTCH" : "히브티",
            "HIBUCCHI" : "히브티",
            "HOMASA" : "호마사",
            "IKANAU" : "이카나우",
            "IKE" : "아이크",
            "IKEa" : "아이크",
            "IKE2" : "아이크",
            "IKE3" : "아이크",
            "IZUKA" : "이즈카",
            "JANAFF" : "야나프",
            "JILL" : "질",
            "KAMURA" : "카무라",
            "KASATAI" : "카사타이",
            "KAYACCHE" : "카야체",
            "KEVIN" : "케빈",
            "KEVIN2" : "케빈",
            "KILROY" : "킬로이",
            "KIMARSI" : "키마시",
            "KOTAHU" : "코타프",
            "KOYUJO" : "코유조",
            "KURTHNAGA" : "쿠르트나가",
            "KURTHNAGA2" : "쿠르트나가",
            "K_BOSS" : "키르바스 장군",
            "K_ZAKO" : "키르바스병",
            "LADY1" : "아주머니",
            "LADY2" : "아주머니",
            "LARGO" : "라르고",
            "LAY" : "라이",
            "LAY2" : "라이",
            "LAY3" : "라이",
            "LEARNE" : "리아네",
            "LEKAIN" : "루칸",
            "LENING" : "레닝",
            "LETHE" : "레테",
            "LETHE2" : "레테",
            "LIBERATION" : "라구즈 해방군",
            "LOFA" : "요파",
            "LOFA2" : "요파",
            "LOTZ" : "롯츠",
            "LOVE" : "연인",
            "LUCHINO" : "루키노",
            "MAID" : "하인",
            "MAIZIN" : "마이진",
            "MAKAROV" : "마카로프",
            "MAKKOYAR" : "막코야",
            "MAN1" : "청년",
            "MAN2" : "청년",
            "MAP02_01" : "카리와 산적",
            "MAP03_01" : "카리와 산적",
            "MAP04_01" : "해적",
            "MAP05_01" : "데인병",
            "MAP06_01" : "데인병",
            "MAP07_01" : "데인병",
            "MAP08_01" : "데인병",
            "MAP09_01" : "데인병",
            "MAP10_01" : "데인병",
            "MAP23_BISHOP" : "파르메니 승려",
            "MAP23_BISHOP2" : "토메나미",
            "MAP23_PRIEST" : "파르메니 승려",
            "MARCIA" : "마샤",
            "MELTY" : "신사 친위대원",
            "MERCHANT" : "상인",
            "MIST" : "미스트",
            "MISTs" : "미스트",
            "MISTER1" : "아저씨",
            "MISTER2" : "아저씨",
            "MISTER3" : "아저씨",
            "MONICA" : "모니카",
            "MORDY" : "모우디",
            "MORDY2" : "모우디",
            "MWARIM" : "무와림",
            "MYSTERY" : "의문의 소녀",
            "MYSTERY_BOY" : "의문의 소년",
            "MYSTERY_LADY" : "의문의 여성",
            "MYSTERY_MAN" : "의문의 남성",
            "NAESALA" : "네사라",
            "NASIR" : "나시르",
            "NASIR2" : "나시르",
            "NAZO" : "수수께끼의 군",
            "NEALUCHI" : "니알루치",
            "NEDAKA" : "네다타",
            "NEDATA" : "네다타",
            "NEPENEE" : "네페니",
            "NOSITOHI" : "노시토히",
            "NOSITOHIB" : "부관",
            "OLIVER" : "올리버",
            "OSCAR" : "오스카",
            "O_BOSS" : "야만족 장군",
            "O_ZAKO" : "야만족병",
            "O_ZAKO_2" : "카리와 산적",
            "PEDDLING" : "행상단",
            "PEGASUSKNIGHT" : "천마 기사",
            "PRAGUE" : "프라하",
            "PRISONER" : "포로",
            "RAJAION" : "라자이온",
            "REDDRAGON" : "고르드아병",
            "REFUGEE" : "난민",
            "RIEUSION" : "뤼시온",
            "RIHITORU" : "리히톨",
            "RUYAHA" : "바르마",
            "SANAKI" : "사나키",
            "SANAKI_BLACK" : "블랙 사나키",
            "SELFDEFENCE" : "자경단",
            "SENERIO" : "세네리오",
            "SENERIO2" : "세네리오",
            "SERVANT" : "하인",
            "SIGRUN" : "시그룬",
            "SIHARAMU" : "시하람",
            "SINSIGUARD" : "신사 친위대원",
            "SIRKUKO" : "시쿠코",
            "SOANVALCKE" : "손바르케",
            "SOLDIER" : "병사",
            "SOTHE" : "소더",
            "STELLA" : "스텔라",
            "TANAS" : "타나스 공작군",
            "TANIS" : "타니스",
            "TAURONEO" : "타우로니오",
            "THIEF" : "도적",
            "THIEF1" : "도적",
            "THIEF2" : "도적",
            "TIAMAT" : "티아마트",
            "TIBARN" : "티반",
            "TIGER" : "갈리아병",
            "TIGERM" : "갈리아병",
            "TOOL" : "라라벨",
            "TOPUCK" : "토팍",
            "TOPUCK2" : "토팍",
            "TRAIN" : "다니엘",
            "TRIAL1_BOSS" : "군장",
            "TRIAL1_BUKA" : "병졸",
            "TRIAL2" : "해적",
            "TRIAL3_L" : "라구즈 투사",
            "TRIAL3_V" : "투사",
            "TRIAL4" : "해적",
            "TRIAL5" : "병졸",
            "TRIAL6_BOSS" : "해적 두목",
            "TRIAL6_BUKA" : "해적",
            "TUT_1" : "아군",
            "TUT_2" : "적군",
            "TUT_3" : "기타",
            "TUT_4" : "우군",
            "ULYSSES" : "율리시스",
            "VILLAGER" : "마을 사람",
            "VOKE" : "폴카",
            "VOKE2" : "폴카",
            "VULCI" : "우르키",
            "WAYU" : "와유",
            "WEAPON" : "무스톤",
            "WHITEDRAGON" : "고르드아병",
            "WOMAN1" : "여성",
            "WOMAN2" : "여성",
            "YUNE" : "윤느",
            "ZAKO" : "데인병",
            "ZAKO_2" : "데인병",
            "ZAKO_3" : "데인병",
            "ZAWANAR" : "자와나",
            "ZELGIUS" : "제르기우스",
            "ZIHARK" : "치하크",

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
                "command": /L_(.*)s\|/gm,
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
                    if (line.trim().match(/^[A-Z]/gm)) {
                        _private_parser.initialize();

                        current_id = line.trim();
                        result.push({
                            "id": current_id,
                            "index": result_index++,
                            "name": "",
                            "script": current_id
                        });

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
/* Deterministic intent hints only. No model, network requests, or execution authority. */
function classifyChat(input){
 const t=input.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D').toLowerCase().replace(/\s+/g,' ').trim();
 if(/bo qua|bo buoc|bo xac nhan|toi la nhan vien|ignore|bypass/.test(t))return {type:'injection'};
 if(/(?:217|21:00|21h|9 gio toi)/.test(t)&&/hoan|refund/.test(t))return {type:'split'};
 if(/doi nham|doi sai|wrong flight/.test(t))return {type:'wrong'};
 if(/mot minh|bay truoc/.test(t)&&/be|binh|tre|con/.test(t))return {type:'child'};
 if(/doi ten|sang ten/.test(t))return {type:'name'};
 if(/nhan vien|nguoi ho tro|ho tro vien|human|staff/.test(t))return {type:'handoff'};
 if(/boi thuong|den bu|compensation/.test(t))return {type:'compensation'};
 if(/hoan|huy het|huy ve|refund/.test(t))return {type:'refund'};
 if(/chuyen nao|chuyen thay the|con cho|co cho|tim chuyen|cac chuyen|xem chuyen|lua chon chuyen/.test(t))return {type:'flights'};
 if(/may gio|trang thai|chuyen cua|status/.test(t))return {type:'status'};
 const matches=[...new Set((t.match(/\b(?:201|205|217)\b/g)||[]))];
 if(matches.length>1)return {type:'ambiguous'};
 if(/khong|dung|khoan|chua|doi y/.test(t))return {type:'ambiguous'};
 if(matches.length===1)return {type:'flight',flight:'PA '+matches[0]};
 if(/toi nay|21:00|21h|9 gio toi/.test(t))return {type:'flight',flight:'PA 217'};
 if(/doi|dong y|ok|xac nhan|sang mai|giu cho/.test(t))return {type:'ambiguous'};
 return {type:'unknown'};
}
if(typeof module!=='undefined')module.exports={classifyChat};

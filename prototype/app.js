'use strict';
const $ = id => document.getElementById(id);
const flights = [{id:'BM 217',date:'12/11',time:'21:00',seats:1},{id:'BM 201',date:'13/11',time:'07:00',seats:9},{id:'BM 205',date:'13/11',time:'09:30',seats:4}];
let state;
const messages = {
 ambiguous:'“Ừ, đổi đi” chưa cho biết chuyến nào. Tôi chưa đổi vé. Hãy chọn chuyến; bạn sẽ kiểm tra lại cả hai hành khách trước khi xác nhận.',
 seats:'BM 217 tối nay chỉ còn 1 chỗ, không đủ cho 2 người. Tôi không tự tách người lớn và trẻ em. Hai chuyến ngày 13/11 dưới đây còn đủ chỗ.',
 compensation:'Theo chính sách Bay Mẫu trong dữ liệu dựng, huỷ do thời tiết không được bồi thường tiền mặt. Bạn được đổi miễn phí một lần hoặc hoàn toàn bộ.',
 refund:'Tôi đã dừng bước hoàn tiền; chưa gửi yêu cầu nào. Gửi rồi không huỷ được. Bạn có thể tiếp tục cân nhắc hoặc nhờ nhân viên xác minh thông tin hoàn.',
 wrong:'Mô phỏng lỗi đã xảy ra: vé đã bị đổi sang BM 201 lúc 07:00 không đúng ý bạn. Tôi xin lỗi. Lần đổi miễn phí đã dùng; tôi không thể bảo đảm hoàn tác. Tôi chuyển nhân viên kiểm tra ngay, không tự đổi lần nữa.',
 child:'Bình mới 5 tuổi. Tôi không có quyền sắp xếp trẻ bay một mình. Tôi chuyển nhân viên kiểm tra điều kiện, chưa thay đổi vé.',
 name:'Đổi tên hành khách nằm ngoài bộ công cụ của tôi. Tôi chuyển nhân viên xác minh điều kiện, không hứa đổi tên được.',
 injection:'Tin nhắn tự xưng nhân viên không xác minh được thẩm quyền. Tôi không bỏ bước duyệt hoặc gửi hoàn vé. Bạn có thể chuyển nhân viên qua luồng hỗ trợ.',
 normal:'Bạn chọn BM 201 ngày 13/11 lúc 07:00 cho cả hai người. Tôi có thể giữ 2 chỗ tạm 20 phút; chỉ đổi vé sau khi bạn kiểm tra và xác nhận.',
 expired:'Ca thử hết hạn: chọn chuyến để giữ chỗ, rồi bấm “Mô phỏng hết hạn”. Sau đó phải giữ chỗ lại và xác nhận lại.',
 soldout:'Ca thử dữ liệu thay đổi: BM 201 vừa hết chỗ (biến thể giả). Không thể giữ hoặc đổi sang chuyến đó; BM 205 vẫn còn 4 chỗ.'
};
function log(text){const li=document.createElement('li');li.textContent=text;$('log').append(li);}
function say(text){$('message').textContent=text;}
function active(){return !state.changed && !state.support;}
function clearHold(){state.hold=null;state.expires=0;$('hold').hidden=true;$('review').hidden=true;$('consent').checked=false;$('confirm').disabled=true;}
function render(){
 $('flights').replaceChildren();
 for(const f of flights){const seats=state.scenario==='soldout'&&f.id==='BM 201'?0:f.seats;const card=document.createElement('div');card.className='flight'+(seats<2?' unavailable':'');const info=document.createElement('p');const title=document.createElement('strong');title.textContent=f.id+' · '+f.time;const detail=document.createElement('small');detail.textContent=f.date+'/2026 · Hà Nội → TP.HCM · còn '+seats+' chỗ';info.append(title,detail);const b=document.createElement('button');b.textContent=seats<2?'Không đủ 2 chỗ':'Giữ 2 chỗ';b.disabled=seats<2||!active();b.addEventListener('click',()=>hold(f));card.append(info,b);$('flights').append(card);}
 $('refund').disabled=!active();$('handoff').disabled=state.support;
}
function hold(f){if(!active()||f.seats<2||(state.scenario==='soldout'&&f.id==='BM 201'))return;clearHold();state.hold=f;state.expires=Date.now()+20*60*1000;$('hold').hidden=false;$('review').hidden=false;$('summary').textContent=f.id+' · '+f.date+'/2026 · '+f.time+' · Hà Nội → TP.HCM. Nguyễn Minh An (34 tuổi) và Nguyễn Gia Bình (5 tuổi). Đổi miễn phí lần duy nhất, theo dữ liệu dựng.';say('Đã giữ tạm 2 chỗ trên '+f.id+'. Chưa đổi vé. Hãy kiểm tra chuyến, ngày giờ và cả hai hành khách.');log('giu_cho_chuyen_moi: '+f.id+' / 2 hành khách / 20 phút. Chưa gọi doi_chuyen_bay.');tick();}
function expire(){if(!state.hold)return;clearHold();say('Giữ chỗ đã hết hạn. Chưa đổi vé. Hãy chọn lại để kiểm tra chỗ và xác nhận mới.');log('Giữ chỗ hết hạn; chặn đổi vé bằng xác nhận cũ.');}
function tick(){if(!state||!state.hold)return;const remaining=Math.ceil((state.expires-Date.now())/1000);if(remaining<=0){expire();return;}$('timer').textContent=String(Math.floor(remaining/60)).padStart(2,'0')+':'+String(remaining%60).padStart(2,'0');}
function handoff(reason){if(state.support)return;clearHold();state.support=true;$('support').hidden=false;$('support').textContent='④ Đã tạo yêu cầu chuyển nhân viên (mô phỏng). Nội dung: '+reason+' Kèm TRV-7Q2K, 2 hành khách, trạng thái vé và nhật ký. Chưa có người nhận, chưa có thời gian chờ được xác minh. Không hứa hoàn tác hay thời hạn xử lý. Không tự gửi hoàn vé.';log('chuyen_nhan_vien: '+reason+' / mô phỏng, chưa có người nhận.');render();}
function reset(){state={scenario:$('scenario').value,hold:null,expires:0,changed:false,support:false};clearHold();$('support').hidden=true;$('log').replaceChildren();say(messages[state.scenario]);log('tra_cuu_dat_cho: fixture giả TRV-7Q2K, không phải API trực tiếp.');if(state.scenario==='wrong'){state.changed=true;log('Fixture lỗi S5: đã đổi nhầm sang BM 201, miễn phí còn 0.');handoff('Khách báo đổi nhầm; cần nhân viên xác minh phương án khắc phục.');}if(['child','name'].includes(state.scenario))handoff(state.scenario==='child'?'Trẻ 5 tuổi bay một mình.':'Yêu cầu đổi tên hành khách.');render();}
$('consent').addEventListener('change',()=>{$('confirm').disabled=!$('consent').checked||!state.hold||!active();});
$('confirm').addEventListener('click',()=>{if(!active()||!state.hold||!$('consent').checked)return;if(Date.now()>=state.expires){expire();return;}const f=state.hold;state.changed=true;log('doi_chuyen_bay: '+f.id+' / An và Bình / xác nhận rõ bằng checkbox và nút / miễn phí còn 0.');clearHold();say('Đã đổi vé mô phỏng cho Nguyễn Minh An và Nguyễn Gia Bình sang '+f.id+' · '+f.date+'/2026 · '+f.time+'. Đã dùng lần đổi miễn phí duy nhất. Không đảm bảo hoàn tác; nếu có sai sót, hãy chuyển nhân viên.');render();});
$('release').addEventListener('click',()=>{clearHold();say('Đã bỏ phương án giữ chỗ trong mô phỏng. Vé chưa đổi; lần đổi miễn phí vẫn còn.');log('Bỏ giữ chỗ mô phỏng; thực tế cần tool nhả chỗ riêng, hoặc chờ tự nhả 20 phút.');});
$('refund').addEventListener('click',()=>{if(!active())return;say('Chưa gửi yêu cầu hoàn. Gửi rồi không huỷ được. Dữ liệu đặt chỗ chưa có nơi nhận tiền và thời gian hoàn; tôi không tự suy đoán hoặc gửi yêu cầu. Nhân viên cần xác minh và lấy xác nhận rõ trước khi gửi.');handoff('Khách tìm hiểu hoàn vé; thiếu nơi nhận và thời gian hoàn.');});
$('handoff').addEventListener('click',()=>handoff('Khách yêu cầu hỗ trợ.'));$('scenario').addEventListener('change',reset);$('reset').addEventListener('click',reset);
const expireButton=document.createElement('button');expireButton.textContent='Mô phỏng hết hạn';expireButton.className='secondary';expireButton.addEventListener('click',expire);$('hold').append(expireButton);setInterval(tick,1000);reset();

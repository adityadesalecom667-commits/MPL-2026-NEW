function closeAnnouncement(){
  localStorage.setItem('mpl_announcement_closed','yes');
  document.getElementById('announcementBanner')?.style.display='none';
}

function checkAccess(){
  const memberId=document.getElementById('loginMemberId').value.trim();
  const code=document.getElementById('loginCode').value.trim();
  const msg=document.getElementById('loginMsg');
  if(!memberId||!code){msg.textContent="Please enter both fields";return;}
  if(memberId.startsWith("MPL-") && code.startsWith("MPL-")){
    localStorage.setItem('mpl_access','granted');
    document.getElementById('accessGate').style.display='none';
  }else{
    msg.textContent="Invalid credentials";
  }
}

function acceptPrivacy(){
  localStorage.setItem('mpl_privacy_accepted','yes');
  document.getElementById('privacyModal').style.display='none';
}

const REG_CLOSE_DATE=new Date('2026-02-28T23:59:59');

function checkRegistrationStatus(){
  const now=new Date();
  const status=document.getElementById('regStatus');
  const action=document.getElementById('regAction');
  const badge=document.getElementById('regBadge');
  if(!status) return;
  if(now>REG_CLOSE_DATE){
    status.textContent='🚫 Registration Closed';
    action.innerHTML='<p style="margin-top:16px;font-weight:bold;color:#dc2626;">Registrations for MPL 2026 are now closed.</p>';
    badge.textContent='Closed';
    badge.style.background='#fee2e2';
    badge.style.color='#991b1b';
  }
}

function updateCountdown(){
  const eventDate=new Date('2026-03-15T00:00:00');
  const now=new Date();
  const diff=eventDate-now;
  const countdown=document.getElementById('countdown');
  if(!countdown) return;
  if(diff<=0){
    countdown.innerHTML='<p style="font-size:1.4rem;">🏆 Tournament has begun!</p>';
    return;
  }
  const days=Math.floor(diff/(1000*60*60*24));
  const hours=Math.floor((diff%(1000*60*60*24))/(1000*60*60));
  const minutes=Math.floor((diff%(1000*60*60))/(1000*60));
  const seconds=Math.floor((diff%(1000*60))/1000);
  document.getElementById('days').textContent=days.toString().padStart(2,'0');
  document.getElementById('hours').textContent=hours.toString().padStart(2,'0');
  document.getElementById('minutes').textContent=minutes.toString().padStart(2,'0');
  document.getElementById('seconds').textContent=seconds.toString().padStart(2,'0');
}

window.addEventListener('load',()=>{
  if(localStorage.getItem('mpl_announcement_closed')==='yes'){
    const banner=document.getElementById('announcementBanner');
    if(banner) banner.style.display='none';
  }
  if(localStorage.getItem('mpl_privacy_accepted')==='yes'){
    document.getElementById('privacyModal').style.display='none';
  }
  if(localStorage.getItem('mpl_access')==='granted'){
    document.getElementById('accessGate').style.display='none';
  }
  if(document.getElementById('countdown')){
    updateCountdown();
    setInterval(updateCountdown,1000);
  }
  checkRegistrationStatus();
});
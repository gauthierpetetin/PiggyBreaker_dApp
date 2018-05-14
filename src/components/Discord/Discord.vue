<template>
  <div>
    <a class="FloatingSupportLink" href="https://discord.gg/YncZzeC" target="_blank" rel="noopener noreferrer">
      <img class="FloatingSupportLink-icon FloatingSupportLink-icon--message" src="/static/img/icon/message-white.svg" alt="">
      <img class="FloatingSupportLink-icon FloatingSupportLink-icon--plane" src="/static/img/icon/discord-white.svg" alt="">
      <div class="FloatingSupportLink-text">
        <span>Talk to us on<br><strong>Discord</strong></span>
      </div>
    </a>
  </div>
</template>

<style scoped>
.FloatingSupportLink {
  position: fixed;
  z-index: 1000;
  right: 3.2rem;
  bottom: 3.2rem;
  overflow: hidden;
  width: 5.2rem;
  height: 5.2rem;
  -webkit-transition: width 0s .25s;
  transition: width 0s .25s
}

.FloatingSupportLink--moveRight {
  right: 9.2rem;
  bottom: 2.4rem
}

.FloatingSupportLink-icon {
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 2;
  display: block;
  width: 5.2rem;
  height: 5.2rem;
  background: #A6A6A6;
  border-radius: 5.2rem 5.2rem;
  -webkit-transition: opacity .25s,-webkit-transform .25s;
  transition: opacity .25s,-webkit-transform .25s;
  transition: transform .25s,opacity .25s;
  transition: transform .25s,opacity .25s,-webkit-transform .25s
}

.FloatingSupportLink-icon--message {
  opacity: 1;
  -webkit-transform: translateZ(0) scale(1);
  transform: translateZ(0) scale(1)
}

.FloatingSupportLink-icon--plane {
  opacity: 0;
  -webkit-transform: translateZ(0) scale(0);
  transform: translateZ(0) scale(0)
}

.FloatingSupportLink-text {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding-left: 5.2rem;
  width: 16rem;
  height: 5.2rem;
  color: #fff;
  background: #A6A6A6;
  border-radius: 5.2rem 5.2rem;
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 1;
  opacity: 0;
  -webkit-transition: opacity .25s;
  transition: opacity .25s;
  font-size: 18px;
  font-family: "gothamRounded"
}

.FloatingSupportLink-text strong {
  font-weight: 500
}

.FloatingSupportLink:hover {
  width: 16rem;
  -webkit-transition: width 0s 0s;
  transition: width 0s 0s
}

.FloatingSupportLink:hover .FloatingSupportLink-icon--message {
  opacity: 0;
  -webkit-transform: translate3d(-10.8rem,0,0) scale(0);
  transform: translate3d(-10.8rem,0,0) scale(0)
}

.FloatingSupportLink:hover .FloatingSupportLink-icon--plane {
  opacity: 1;
  -webkit-transform: translate3d(-10.8rem,0,0) scale(1);
  transform: translate3d(-10.8rem,0,0) scale(1)
}

.FloatingSupportLink:hover .FloatingSupportLink-text {
  opacity: 1
}
</style>

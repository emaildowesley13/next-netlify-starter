import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Welcome to my app!" />
        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>
      </main>

      <Footer />
    </div>
  )
}
// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const venom = require('venom-bot');
const axios = require('axios');

venom
  .create({
    session: 'session-name', //name of session
    multidevice: true // for version not multidevice use false.(default: true)
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage((message) => {
    if (message.body) {
		arr = message.body.split(' ')
		userr0 = arr[0].toLowerCase()
		userr1 = arr[1].toLowerCase()
		
		axios.get('https://tmi.twitch.tv/group/user/'+userr0+'/chatters').then(resp => {

			mod = resp.data.chatters.moderators
			vip = resp.data.chatters.vips
			view = resp.data.chatters.viewers
			
			var found = "🔗 https://www.twitch.tv/" + userr0 + "\n🔴 " + userr1 + " está offline";
			
			for(var i= 0, l = mod.length; i< l; i++) {
				if (mod[i] === userr1) {
					found = "🔗 https://www.twitch.tv/" + userr0 + "\n🟢 " + userr1 + " está online";
				}
			}
			for(var i= 0, l = vip.length; i< l; i++) {
				if (vip[i] === userr1) {
					found = "🔗 https://www.twitch.tv/" + userr0 + "\n🟢 " + userr1 + " está online";
				}
			}
			for(var i= 0, l = view.length; i< l; i++) {
				if (view[i] === userr1) {
					found = "🔗 https://www.twitch.tv/" + userr0 + "\n🟢 " + userr1 + " está online";
				}
			}
			
			console.log(message.from + " " + found);
			client.sendText(message.from, found)

		});
    }
  });
}

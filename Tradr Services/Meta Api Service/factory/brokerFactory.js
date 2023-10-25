const MetaApi = require('metaapi.cloud-sdk').default;

const api = new MetaApi(token);
const account = await api.metatraderAccountApi.getAccount(accountId);
const connection = account.getStreamingConnection();
// let accounts = []

// module.exports = async function(loginId, password, serverName) {
//   if(accounts.length === 0) {
//     accounts = await api.metatraderAccountApi.getAccounts();
//   }
//   let account = accounts.find(a => a.login === loginId && a.type.startsWith('cloud'));
//   if (!account) {
//     account = await api.metatraderAccountApi.createAccount({
//       name: 'TradeBot account',
//       type: 'cloud',
//       login: loginId,
//       password: password,
//       server: serverName,
//       platform: 'mt5',
//       application: 'MetaApi',
//       magic: 1000
//     });
//     await account.deploy();
//   }
//   await account.waitConnected();
// };

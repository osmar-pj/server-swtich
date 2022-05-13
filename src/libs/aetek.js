import axios from 'axios'

const params = {
  login: {
    username: 'admin',
    password: 'starchuE=mc2',
    user_ip: '192.168.1.105',
    sessid: '986110792'
  }
}

const session = await axios.post('http://192.168.1.105/api/login', params)
console.log(session.data)

const get_status = await axios.get('http://192.168.1.105/api/dev_list_table', { headers: { Cookie: 'seid=986110792' } })
console.log(get_status.data.device_list_table[0])

// const logout = await axios.post('http://192.168.1.105/api/logout', { logout: { sessid: '375118820' } }, { headers: { 'Cookie': 'seid=375118820' } })
// console.log(logout.data)
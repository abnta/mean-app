const connectionConfig = require('./config')

module.exports = function(){
    return 'mongodb://'+connectionConfig.userId+':'+connectionConfig.password+'@ds159546.mlab.com:59546/mean-app'
}
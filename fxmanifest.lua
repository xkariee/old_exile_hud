fx_version 'adamant'
game 'gta5'
version '1.0.0'
client_scripts {
  '@es_extended/imports.lua',
	'client/client.lua',
  'config.lua'
}
server_scripts {
  'server/s.lua'
}
ui_page 'html/ui.html'
--ui_page 'https://hud.exilerp.me/'
exports {
  'RadarShown',
  'getAlign'
}
files {
  'html/**',
}
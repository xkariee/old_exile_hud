local oldhud = false
local RPM = 0
local RPMTime = GetGameTimer()
local PlayerPedId = PlayerPedId
local PlayerId = PlayerId
local GetEntityCoords = GetEntityCoords
local GetVehiclePedIsIn = GetVehiclePedIsIn
local GetVehicleClass = GetVehicleClass
local IsVehicleStopped = IsVehicleStopped
local GetIsVehicleEngineRunning = GetIsVehicleEngineRunning
local GetVehicleCurrentGear = GetVehicleCurrentGear
local GetPedInVehicleSeat = GetPedInVehicleSeat
local GetPlayerSprintStaminaRemaining = GetPlayerSprintStaminaRemaining
local GetPlayerUnderwaterTimeRemaining = GetPlayerUnderwaterTimeRemaining
local GetEntityHealth = GetEntityHealth
local GetPedArmour = GetPedArmour
local IsPedSwimmingUnderWater = IsPedSwimmingUnderWater
local NetworkIsPlayerTalking = NetworkIsPlayerTalking
local GetPlayerServerId = GetPlayerServerId
local IsPedInAnyVehicle = IsPedInAnyVehicle
local IsPedRunning = IsPedRunning
local IsPedSprinting = IsPedSprinting
local GetEntityHeading = GetEntityHeading
local IsRadarEnabled = IsRadarEnabled
local GetVehicleCurrentRpm = GetVehicleCurrentRpm
local GetEntitySpeed = GetEntitySpeed
local IsPauseMenuActive = IsPauseMenuActive
local GetVehicleEstimatedMaxSpeed = GetVehicleEstimatedMaxSpeed
local SetBigmapActive = SetBigmapActive
local DisplayRadar = DisplayRadar
local IsBigmapActive = IsBigmapActive
local IsBigmapFull = IsBigmapFull
local GetGameTimer = GetGameTimer
local GetActiveScreenResolution = GetActiveScreenResolution
local GetSafeZoneSize = GetSafeZoneSize
local GetAspectRatio = GetAspectRatio
local GetStreetNameAtCoord = GetStreetNameAtCoord
local GetStreetNameFromHashKey = GetStreetNameFromHashKey
local GetNameOfZone = GetNameOfZone
local SetRadarBigmapEnabled = SetRadarBigmapEnabled
local GetVehicleEngineHealth = GetVehicleEngineHealth
local hudhidden = false
local playerPed = PlayerPedId()
local pid = PlayerId()
local pedinanyveh = IsPedInAnyVehicle(playerPed, true)
local pcoords  = GetEntityCoords(playerPed)
local citizenWait = 130
local citizenWait2 = 350
local citizenWait3 = 500
local beltOn = false

CreateThread(function()
	while true do
		Wait(500)
		playerPed = PlayerPedId()
		pid = PlayerId()
        pedinanyveh = IsPedInAnyVehicle(playerPed, true)
		pcoords = GetEntityCoords(playerPed)
	end
end)

local Ped = {
	Vehicle = nil,
	VehicleClass = nil,
	VehicleStopped = true,
	VehicleEngine = false,
	VehicleGear = nil,
    Health = 0,
	Armor = 0,
	Stamina = 0,
	Underwater = false,
	UnderwaterTime = 0,
	Driver = false,
	PhoneVisible = false,
	DisplayStreet = false,
    PauseMenu = false,
    IsRunning = false,
    IsSprinting = false
}

function GetStreetsCustom(coords)
	local s1, s2 = GetStreetNameAtCoord(coords.x, coords.y, coords.z, Citizen.PointerValueInt(), Citizen.PointerValueInt())
	local street1, street2 = GetStreetNameFromHashKey(s1), GetStreetNameFromHashKey(s2)
	return "~y~" .. street1 .. (street2 ~= "" and "~s~ / " .. street2 or "")
end

local streetLabel = {}

CreateThread(function() 
    while true do
        Wait(citizenWait3)

        if pedinanyveh then
            Ped.InVehicle = true
            Ped.Vehicle = GetVehiclePedIsIn(playerPed, false)
            Ped.VehicleClass = GetVehicleClass(Ped.Vehicle)
            Ped.VehicleStopped = IsVehicleStopped(Ped.Vehicle)
            Ped.VehicleEngine = GetIsVehicleEngineRunning(Ped.Vehicle)
            Ped.VehicleGear = GetVehicleCurrentGear(Ped.Vehicle)	
            Ped.Driver = GetPedInVehicleSeat(Ped.Vehicle, -1) == playerPed
        else
            Ped.Vehicle = nil
            Ped.InVehicle = false
            Ped.Stamina = GetPlayerSprintStaminaRemaining(playerPed)
            Ped.UnderwaterTime = GetPlayerUnderwaterTimeRemaining(playerPed)
            if Ped.UnderwaterTime < 0.0 then
                Ped.UnderwaterTime = 0.0
            end
        end

        Ped.Health = GetEntityHealth(playerPed)
        Ped.Armor = GetPedArmour(playerPed)
        Ped.Underwater = IsPedSwimmingUnderWater(playerPed)

        Ped.PhoneVisible = exports['gcphone']:getMenuIsOpen()
        Ped.DisplayStreet = exports['ExileRP']:DisplayingStreet()

        Ped.IsRunning = IsPedRunning(playerPed)
        Ped.IsSprinting = IsPedSprinting(playerPed)

        local direction = nil
        for k, v in pairs(Config.Directions) do
            direction = GetEntityHeading(playerPed)
            if math.abs(direction - k) < 22.5 then
                direction = v
                break
            end
        end

        local zone = GetNameOfZone(pcoords.x, pcoords.y, pcoords.z)

        streetLabel.zone = (Config.Zones[zone:upper()] or zone:upper())
        streetLabel.street = GetStreetsCustom(pcoords)
        streetLabel.direction = (direction or 'N')   
    end    
end)

local cam = false

RegisterNetEvent('route68:kino2')
AddEventHandler('route68:kino2', function()
    cam = not cam
end)

CreateThread(function() 
    local minimap = RequestScaleformMovie("minimap")
    SetRadarBigmapEnabled(true, false)
    Wait(0)
    SetRadarBigmapEnabled(false, false)
    while true do
        if not oldhud then
            BeginScaleformMovieMethod(minimap, "SETUP_HEALTH_ARMOUR")
            ScaleformMovieMethodAddParamInt(3)
            EndScaleformMovieMethod()
            Wait(255)
        else
            Wait(1000)
        end    
    end
end)

CreateThread(function() 
    while true do
        Wait(5000)
        local expanded = IsBigmapActive()
        local fullMap = IsBigmapFull()
        if expanded or fullMap then
            SetRadarBigmapEnabled(true, false)
            Wait(0)
            SetRadarBigmapEnabled(false, false)
        end    
    end
end)

CreateThread(function()
    while true do
        Wait(citizenWait)
        if Ped.Vehicle and not IsPauseMenuActive() and not oldhud then
            Wait(10)
            local street2 = ""
            if streetLabel.zone then
                street2 = string.gsub(string.gsub(streetLabel.zone, "~s~", ""), "~y~", "")
            end
            if streetLabel.street then
                local xx = ""
                if street2 ~= "" then
                    xx = ", "
                end
                street2 = street2..xx..string.gsub(string.gsub(streetLabel.street, "~s~", ""), "~y~", "")
            end
            local carSpeed = math.floor(GetEntitySpeed(Ped.Vehicle) * 3.6 + 0.5)
            local carMaxSpeed = math.ceil(GetVehicleEstimatedMaxSpeed(Ped.Vehicle) * 3.6 + 0.5)
            local carSpeedPercent = carSpeed / carMaxSpeed * 100
            local rpm = GetVehicleCurrentRpm(Ped.Vehicle) * 100

            local eHealth = GetVehicleEngineHealth(Ped.Vehicle)
            SendNUIMessage({
                showhud = true,
                speedometer = true,
                belt = beltOn,
                speed = carSpeed,
                percent = carSpeedPercent,
                tachometer = true,
                rpmx = rpm,
                gear = Ped.VehicleGear,
                eHealth = eHealth,
                street = street2,
                direction = (streetLabel.direction or 'N'),
            })
        else
            SendNUIMessage({
                showhud = false
            })
            Wait(1500)
        end
    end
end)

RegisterNetEvent("exilerp_scripts:toggleSpeedo", function(b) 
    SendNUIMessage({
        type = "SWITCH_SPEEDO",
        bool = b
    })
end)

RegisterNetEvent("ExileRP:ToogleHud", function()
    SendNUIMessage({
        type = "TOGGLE_HUD",
    })
end)

-- Show/Hide Radar
local radardisplayed = true
CreateThread(function()
    while true do
        Wait(2000)
        if hudhidden then
            radardisplayed = false
            DisplayRadar(0)
        else 
            if Ped.Vehicle or Ped.PhoneVisible then
                radardisplayed = true
                DisplayRadar(1)
            else
                radardisplayed = false
                DisplayRadar(0)
            end  
        end     
    end
end)

function RadarShown()
    return radardisplayed
end

--true stary false nowy
local progressAlign = "top"
RegisterNUICallback("progressalign", function(data,cb) 
    if data.align == "1" then
        progressAlign = "top"
    elseif data.align == "2" then
        progressAlign = "bottom"
    elseif data.align == "3" then
        progressAlign = "left"
    elseif data.align == "4" then
        progressAlign = "right"
    end
    cb({})
end)

function getAlign() 
    return progressAlign
end

RegisterNUICallback("sethud", function(data, cb)
    if data.mode then
        oldhud = true
        CreateThread(function() 
            Wait(200)
            SetBigmapActive(true, true)
            Wait(10)
            SetBigmapActive(false, false)
        end)
        TriggerEvent('esx_status:setDisplay', 0.5)
    else
        oldhud = false
        TriggerEvent('esx_status:setDisplay', 0.0)
    end      
    TriggerEvent("ExileRP:oldHud", oldhud)
    cb({})
end)

function toboolean(str)
    local bool = false
    if str == "true" then
        bool = true
    end
    return bool
end

RegisterNetEvent("route68:kino", function() 
    handleCam()
end)
RegisterNetEvent("route68:kino2", function() 
    handleCam()
end)

function handleCam() 
    hudhidden = not hudhidden
    if not oldhud then
        SendNUIMessage({type="SWITCH_DISPLAY"})
    end
end

CreateThread(function() 
    while true do
        Wait(citizenWait2)
        if not oldhud then
            local state = NetworkIsPlayerTalking(pid)
            local mode = Player(GetPlayerServerId(pid)).state.proximity.mode
            SendNUIMessage({
                type = 'UPDATE_VOICE',
                isTalking = state,
                mode = mode
            }) 
        else
            Wait(1000)
        end
    end
end)

RegisterCommand("hudsettings", function(src, args, raw)
        SetNuiFocus(true, true)
        SendNUIMessage({
            type = "OPEN_SETTINGS"
        })
end, false)

RegisterCommand("fixcursor", function(src,args,raw) 
    SetNuiFocus(false, false)
end)

RegisterNUICallback("NUIFocusOff", function(data,cb) 
    SetNuiFocus(false, false)
    cb({})
end)

CreateThread(function()
    while true do
        Wait(2000)
        if not oldhud then
            local hunger, thirst = nil, nil
            TriggerEvent('esx_status:getStatus', 'hunger', function(status)
                hunger = status.getPercent()
            end)
            TriggerEvent('esx_status:getStatus', 'thirst', function(status)
                thirst = status.getPercent()
            end)

            SendNUIMessage({
                type = 'UPDATE_HUD',
                hunger = hunger,
                thirst = thirst,
                armor = Ped.Armor,
                nurkowanie = Ped.UnderwaterTime*10,
                inwater = Ped.Underwater,
                zycie = Ped.Health - 100,
                isdead = exports["esx_ambulancejob"]:isDead()
            })
        else
            Wait(1000)
        end
    end
end)

-- voice
RegisterNetEvent("ExileRP:changeHud", function(mode) 
    newhud = mode
    SendNUIMessage({type="SWITCH_VISIBILITY", bool=mode})
    if not mode then
        CreateThread(function()
            Wait(1500)
            SetRadarBigmapEnabled(true, false)
            Wait(0)
            SetRadarBigmapEnabled(false, false)
        end)
    end    
end)


function GetProximity(proximity)
    for k,v in pairs(Config.proximityModes) do
        if v[1] == proximity then
            return v[2]
        end
    end
    return 0
end

RegisterNetEvent('esx:playerLoaded')
AddEventHandler('esx:playerLoaded', function()
    SendNUIMessage({
        type = 'TOGGLE_HUD'
    })
end)

RegisterCommand('togglehud', function()
    SendNUIMessage({
        type = 'TOGGLE_HUD'
    })
end, false)

RegisterKeyMapping('togglehud', 'Włącz/wyłącz HUD', 'mouse_button', 'MOUSE_MIDDLE')

RegisterCommand("minimapfix", function(src, args, raw) 
    local minimap = RequestScaleformMovie("minimap")
    SetRadarBigmapEnabled(true, false)
    Wait(0)
    SetRadarBigmapEnabled(false, false)
end)

RegisterCommand("switchhud", function(src,args,raw) 
    oldhud = not oldhud
    SendNUIMessage({type="SWITCH_HUD",mode=oldhud})
    ESX.ShowNotification("~w~Zmieniono tryb hudu")
    CreateThread(function() 
        Wait(200)
        SetBigmapActive(true, true)
        Wait(10)
        SetBigmapActive(false, false)
    end)
    if oldhud then
        TriggerEvent('esx_status:setDisplay', 0.5)
    else
        TriggerEvent('esx_status:setDisplay', 0.0)
    end    
    TriggerEvent("ExileRP:oldHud", oldhud)
end)


local CruiseControl = false

function _DrawText(x, y, width, height, scale, text, r, g, b, a)
	SetTextFont(4)
	SetTextScale(scale, scale)
	SetTextColour(r, g, b, a)
	SetTextDropShadow(0, 0, 0, 0, 255)
	SetTextDropShadow()
	SetTextOutline()

	SetTextEntry("STRING")
	AddTextComponentString(text)
	DrawText(x - width / 2, y - height / 2 + 0.005)
end

CreateThread(function() 
    while true do
        if oldhud then
            Wait(3)
            if streetLabel and streetLabel.direction and IsRadarEnabled() then
                _DrawText(0.515, 1.26, 1.0, 1.0, 0.4, streetLabel.zone, 66, 165, 245, 200)
                _DrawText(0.515, 1.28, 1.0, 1.0, 0.33, streetLabel.street, 165, 165, 165, 200)
                _DrawText((streetLabel.direction:len() > 1 and 0.644 or 0.648), 1.28, 1.0, 1.0, 0.33, streetLabel.direction, 255, 255, 255, 200)
            else
                Wait(500)
            end
        else
            Wait(1500)     
        end    
    end    
end)

CreateThread(function()
	while true do
        if oldhud then
            Wait(3)
            if Ped.Vehicle then
                local Gear = Ped.VehicleGear
                if not Ped.VehicleEngine then
                    Gear = 'P'
                elseif Ped.VehicleStopped then
                    Gear = 'N'
                elseif Ped.VehicleClass == 15 or Ped.VehicleClass == 16 then
                    Gear = 'F'
                elseif Ped.VehicleClass == 14 then
                    Gear = 'S'
                elseif Gear == 0 then
                    Gear = 'R'
                end

                local RPMScale = 0
                if (Ped.VehicleClass >= 0 and Ped.VehicleClass <= 5) or (Ped.VehicleClass >= 9 and Ped.VehicleClass <= 12) or Ped.VehicleClass == 17 or Ped.VehicleClass == 18 or Ped.VehicleClass == 20 then
                    RPMScale = 7000
                elseif Ped.VehicleClass == 6 then
                    RPMScale = 7500
                elseif Ped.VehicleClass == 7 then
                    RPMScale = 8000
                elseif Ped.VehicleClass == 8 then
                    RPMScale = 11000
                elseif Ped.VehicleClass == 15 or Ped.VehicleClass == 16 then
                    RPMScale = -1
                end

                local Speed = math.floor(GetEntitySpeed(Ped.Vehicle) * 3.6 + 0.5)
                if RPMTime <= GetGameTimer() then
                    local r = GetVehicleCurrentRpm(Ped.Vehicle)
                    if not Ped.VehicleEngine then
                        r = 0
                    elseif r > 0.99 then
                        r = r * 100
                        r = r + math.random(-2,2)

                        r = r / 100
                        if r < 0.12 then
                            r = 0.12
                        end
                    else
                        r = r - 0.1
                    end

                    RPM = math.floor(RPMScale * r + 0.5)
                    if RPM < 0 then
                        RPM = 0
                    elseif Speed == 0.0 and r ~= 0 then
                        RPM = math.random(RPM, (RPM + 50))
                    end

                    RPM = math.floor(RPM / 10) * 10
                    RPMTime = GetGameTimer() + 50
                end

                local UI = { x = 0.0, y = 0.0 }
                if RPMScale > 0 then
                    drawRct(UI.x + 0.1135, 	UI.y + 0.804, 0.042,0.026,0,0,0,100)
                    drawTxt(UI.x + 0.6137, 	UI.y + 1.296, 1.0,1.0,0.45 , "~" .. (RPM > (RPMScale - 1000) and "r" or "w") .. "~" .. RPM, 255, 255, 255, 255)
                    drawTxt(UI.x + 0.635, 	UI.y + 1.3, 1.0,1.0,0.35, "~w~rpm/~y~" .. Gear, 255, 255, 255, 255)
                else
                    drawRct(UI.x + 0.1135, 	UI.y + 0.804, 0.042,0.026,0,0,0,100)
                    drawTxt(UI.x + 0.6137, 	UI.y + 1.296, 1.0,1.0,0.45, math.floor(pcoords.z), 255, 255, 255, 255)
                    drawTxt(UI.x + 0.635, 	UI.y + 1.3, 1.0,1.0,0.35, "mnpm", 255, 255, 255, 255)
                end

                drawRct(UI.x + 0.1195, 	UI.y + 0.938, 0.036,0.03,0,0,0,100)
                drawTxt(UI.x + 0.62, 	UI.y + 1.431, 1.0,1.0,0.5 , "~" .. (CruiseControl and "b" or "w") .. "~" .. Speed, 255, 255, 255, 255)
                drawTxt(UI.x + 0.637, 	UI.y + 1.438, 1.0,1.0,0.35, "~" .. (Speed > 85 and (Speed > 155 and "r" or "y") or "w") .. "~km/h", 255, 255, 255, 255)            else
                Wait(500)
            end
        else
            Wait(1500)        
        end    
	end
end)

function drawTxt(x, y, width, height, scale, text, r, g, b, a)
    SetTextFont(4)
    SetTextProportional(0)
    SetTextScale(scale, scale)
    SetTextColour(r, g, b, a)
    SetTextDropShadow(0, 0, 0, 0,255)
    SetTextEdge(2, 0, 0, 0, 255)
    SetTextDropShadow()
    SetTextOutline()

    SetTextEntry("STRING")
    AddTextComponentString(text)
    DrawText(x - width / 2, y - height / 2 + 0.005)
end

function drawRct(x, y, width, height, r, g, b, a)
	DrawRect(x + width / 2, y + height / 2, width, height, r, g, b, a)
end

function GetMinimapAnchor()
    local safezone = GetSafeZoneSize()
    local safezone_x = 1.0 / 20.0
    local safezone_y = 1.0 / 20.0
    local aspect_ratio = GetAspectRatio(0)
    local res_x, res_y = GetActiveScreenResolution()
    local xscale = 1.0 / res_x
    local yscale = 1.0 / res_y
    local Minimap = {}
    Minimap.width = xscale * (res_x / (4 * aspect_ratio))
    Minimap.height = yscale * (res_y / 5.674)
    Minimap.left_x = xscale * (res_x * (safezone_x * ((math.abs(safezone - 1.0)) * 10)))
    Minimap.bottom_y = 1.0 - yscale * (res_y * (safezone_y * ((math.abs(safezone - 1.0)) * 10)))
    Minimap.right_x = Minimap.left_x + Minimap.width
    Minimap.top_y = Minimap.bottom_y - Minimap.height
    Minimap.x = Minimap.left_x
    Minimap.y = Minimap.top_y
    Minimap.xunit = xscale
    Minimap.yunit = yscale
    return Minimap
end

local cam = false

RegisterNetEvent('route68:kino2')
AddEventHandler('route68:kino2', function()
    cam = not cam
end)

local OnlyDriver = false
local sleep = nil
CreateThread(function()
    while true do
        if oldhud then
            if cam then
                sleep = 500
                DisplayRadar(false)
                TriggerEvent('ExileRP:setDisplayStreet', false)
            else
                sleep = 3
                if Ped.InVehicle then
                    if not OnlyDriver or Ped.Driver then
                        DisplayRadar(true)
                        if not Ped.DisplayStreet then
                            TriggerEvent('ExileRP:setDisplayStreet', true)
                        end
                    end
                elseif Ped.PhoneVisible then
                    DisplayRadar(true)
                    if not Ped.DisplayStreet then
                        TriggerEvent('ExileRP:setDisplayStreet', true)
                    end
                else
                    DisplayRadar(false)
                    if Ped.DisplayStreet then
                        TriggerEvent('ExileRP:setDisplayStreet', false)
                    end
                    local MM = GetMinimapAnchor()
                    local BarY = MM.bottom_y - ((MM.yunit * 18.0) * 0.55)
                    local BackgroundBarH = MM.yunit * 18.0
                    local BarH = BackgroundBarH / 2
                    local BarSpacer = MM.xunit * 3.0
                    local BackgroundBar = {['R'] = 0, ['G'] = 0, ['B'] = 0, ['A'] = 125, ['L'] = 0}
                    
                    local HealthBaseBar = {['R'] = 57, ['G'] = 102, ['B'] = 57, ['A'] = 175, ['L'] = 1}
                    local HealthBar = {['R'] = 114, ['G'] = 204, ['B'] = 114, ['A'] = 175, ['L'] = 2}
                    
                    local HealthHitBaseBar = {['R'] = 112, ['G'] = 25, ['B'] = 25, ['A'] = 175}
                    local HealthHitBar = {['R'] = 224, ['G'] = 50, ['B'] = 50, ['A'] = 175}
                    
                    local ArmourBaseBar = {['R'] = 47, ['G'] = 92, ['B'] = 115, ['A'] = 175, ['L'] = 1}
                    local ArmourBar = {['R'] = 93, ['G'] = 182, ['B'] = 229, ['A'] = 175, ['L'] = 2}
                    
                    local AirBaseBar = {['R'] = 67, ['G'] = 106, ['B'] = 130, ['A'] = 175, ['L'] = 1}
                    local AirBar = {['R'] = 174, ['G'] = 219, ['B'] = 242, ['A'] = 175, ['L'] = 2}
                    
                    local BackgroundBarW = MM.width
                    local BackgroundBarX = MM.x + (MM.width / 2)
                    _DrawRect(BackgroundBarX, BarY, BackgroundBarW, BackgroundBarH, BackgroundBar.R, BackgroundBar.G, BackgroundBar.B, BackgroundBar.A, BackgroundBar.L)

                    local HealthBaseBarW = (MM.width / 2) - (BarSpacer / 2)
                    local HealthBaseBarX = MM.x + (HealthBaseBarW / 2)
                    local HealthBaseBarR, HealthBaseBarG, HealthBaseBarB, HealthBaseBarA = HealthBaseBar.R, HealthBaseBar.G, HealthBaseBar.B, HealthBaseBar.A
                    local HealthBarW = (MM.width / 2) - (BarSpacer / 2)
                    if Ped.Health < 200 and Ped.Health > 100 then
                        HealthBarW = ((MM.width / 2) - (BarSpacer / 2)) / 100 * (Ped.Health - 100)
                    elseif Ped.Health < 100 then
                        HealthBarW = 0
                    end

                    local HealthBarX = MM.x + (HealthBarW / 2)
                    local HealthBarR, HealthBarG, HealthBarB, HealthBarA = HealthBar.R, HealthBar.G, HealthBar.B, HealthBar.A
                    if Ped.Health <= 130 or (Ped.Stamina >= 90.0 and (Ped.IsRunning or Ped.IsSprinting)) then
                        HealthBaseBarR, HealthBaseBarG, HealthBaseBarB, HealthBaseBarA = HealthHitBaseBar.R, HealthHitBaseBar.G, HealthHitBaseBar.B, HealthHitBaseBar.A
                        HealthBarR, HealthBarG, HealthBarB, HealthBarA = HealthHitBar.R, HealthHitBar.G, HealthHitBar.B, HealthHitBar.A
                    end
                    
                    _DrawRect(HealthBaseBarX, BarY, HealthBaseBarW, BarH, HealthBaseBarR, HealthBaseBarG, HealthBaseBarB, HealthBaseBarA, HealthBaseBar.L)
                    _DrawRect(HealthBarX, BarY, HealthBarW, BarH, HealthBarR, HealthBarG, HealthBarB, HealthBarA, HealthBar.L)
                    if not Ped.Underwater then
                        local ArmourBaseBarW = (MM.width / 2) - (BarSpacer / 2)
                        local ArmourBaseBarX = MM.right_x - (ArmourBaseBarW / 2)
                        local ArmourBarW = ((MM.width / 2) - (BarSpacer / 2)) / 100 * Ped.Armor
                        local ArmourBarX = MM.right_x - ((MM.width / 2) - (BarSpacer / 2)) + (ArmourBarW / 2)

                        _DrawRect(ArmourBaseBarX, BarY, ArmourBaseBarW, BarH, ArmourBaseBar.R, ArmourBaseBar.G, ArmourBaseBar.B, ArmourBaseBar.A, ArmourBaseBar.L)
                        _DrawRect(ArmourBarX, BarY, ArmourBarW, BarH, ArmourBar.R, ArmourBar.G, ArmourBar.B, ArmourBar.A, ArmourBar.L)
                    else
                        local ArmourBaseBarW = (((MM.width / 2) - (BarSpacer / 2)) / 2) - (BarSpacer / 2)
                        local ArmourBaseBarX = MM.right_x - (((MM.width / 2) - (BarSpacer / 2)) / 2) - (ArmourBaseBarW / 2) - (BarSpacer / 2)
                        local ArmourBarW = ((((MM.width / 2) - (BarSpacer / 2)) / 2) - (BarSpacer / 2)) / 100 * Ped.Armor
                        local ArmourBarX = MM.right_x - ((MM.width / 2) - (BarSpacer / 2)) + (ArmourBarW / 2)

                        _DrawRect(ArmourBaseBarX, BarY, ArmourBaseBarW, BarH, ArmourBaseBar.R, ArmourBaseBar.G, ArmourBaseBar.B, ArmourBaseBar.A, ArmourBaseBar.L)
                        _DrawRect(ArmourBarX, BarY, ArmourBarW, BarH, ArmourBar.R, ArmourBar.G, ArmourBar.B, ArmourBar.A, ArmourBar.L)
                        
                        local AirBaseBarW = (((MM.width / 2) - (BarSpacer / 2)) / 2) - (BarSpacer / 2)
                        local AirBaseBarX = MM.right_x - (AirBaseBarW / 2)
                        local AirBarW = ((((MM.width / 2) - (BarSpacer / 2)) / 2) - (BarSpacer / 2)) / 10.0 * Ped.UnderwaterTime
                        local AirBarX = MM.right_x - ((((MM.width / 2) - (BarSpacer / 2)) / 2) - (BarSpacer / 2)) + (AirBarW / 2)

                        _DrawRect(AirBaseBarX, BarY, AirBaseBarW, BarH, AirBaseBar.R, AirBaseBar.G, AirBaseBar.B, AirBaseBar.A, AirBaseBar.L)
                        _DrawRect(AirBarX, BarY, AirBarW, BarH, AirBar.R, AirBar.G, AirBar.B, AirBar.A, AirBar.L)
                    end
                end 
            end   
            Wait(sleep) 
        else
            Wait(1000)
        end
	end
end)

function _DrawRect(X, Y, W, H, R, G, B, A, L)
	SetUiLayer(L)
	DrawRect(X, Y, W, H, R, G, B, A)
end

IsCar = function(veh)
    local vc = GetVehicleClass(veh)
    return (vc >= 0 and vc <= 7) or (vc >= 9 and vc <= 12) or (vc >= 17 and vc <= 20)
    end 

Fwv = function (entity)
    local hr = GetEntityHeading(entity) + 90.0
    if hr < 0.0 then hr = 360.0 + hr end
    hr = hr * 0.0174533
    return { x = math.cos(hr) * 2.0, y = math.sin(hr) * 2.0 }
  end
local speedBuffer = {0, 0}
local velBuffer = {0, 0}
Citizen.CreateThread(function()
while true do
Citizen.Wait(4)

local ped = GetPlayerPed(-1)
local car = GetVehiclePedIsIn(ped)

if car ~= 0 and (wasInCar or IsCar(car)) then
  wasInCar = true
         if isUiOpen == false and not IsPlayerDead(PlayerId()) then
            isUiOpen = true
        end

   if beltOn then 
  DisableControlAction(0, 75, true)  -- Disable exit vehicle when stop
  DisableControlAction(27, 75, true) -- Disable exit vehicle when Driving
  end

  speedBuffer[2] = speedBuffer[1]
  speedBuffer[1] = GetEntitySpeed(car)


  
  if speedBuffer[2] ~= nil 
     and not beltOn
     and GetEntitySpeedVector(car, true).y > 1.0  
     and speedBuffer[1] > 19.25 
     and (speedBuffer[2] - speedBuffer[1]) > (speedBuffer[1] * 0.255) then
     
    local co = GetEntityCoords(ped)
    local fw = Fwv(ped)
    SetEntityCoords(ped, co.x + fw.x, co.y + fw.y, co.z - 0.47, true, true, true)
    SetEntityVelocity(ped, velBuffer[2].x, velBuffer[2].y, velBuffer[2].z)
    Citizen.Wait(1)
    SetPedToRagdoll(ped, 1000, 1000, 0, 0, 0, 0)
  end
    
  velBuffer[2] = velBuffer[1]
  velBuffer[1] = GetEntityVelocity(car)
    
  if IsControlJustReleased(0, 29) and GetLastInputMethod(0) then
    beltOn = not beltOn 
    if beltOn then
    Citizen.Wait(1)

          --- Täältä voit muuttaa ääntä, kun turvavyö laitetaan päälle -- Tässä ----
        ---- Here you can change sounds, when you put seatbelt on ----- Here -----
      TriggerServerEvent('InteractSound_SV:PlayOnSource', 'belton', 0.3)
        
      isUiOpen = true 
    else 
              --- Täältä voit muuttaa ääntä, kun turvavyö otetaan pois -- Tässä ------
            ---- Here you can change sounds, when you take seatbelt off - Here -----
  TriggerServerEvent('InteractSound_SV:PlayOnSource', 'beltoff', 0.3)

      isUiOpen = true  
    end
  end
  
elseif wasInCar then
  wasInCar = false
  beltOn = false
  speedBuffer[1], speedBuffer[2] = 0.0, 0.0
         if isUiOpen == true and not IsPlayerDead(PlayerId()) then
            isUiOpen = false 
        end
        Citizen.Wait(500)
else
    Citizen.Wait(1000)
end

end
end)
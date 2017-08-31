# Modules

Framer.Extras.Hints.disable()

InputModule = require "input"
# Styles



# Global Variables

numOfCards = 0
newCardName = "Untitled"
newCardAmount = "$1500"

# Classes

class Card extends Layer
    MakeCard: (amount, timeLeft, cardName, lastFour) ->
     requestAmt = new TextLayer
          text: amount
          x: 20
          y: 102
          width: 150
          fontSize: 16
          fontFamily: "Interstate"
          parent: this
          textAlign: "left"
          color: "#53565A"
     timeLefttxt = new TextLayer
          text: timeLeft
          x: 175
          y: 102
          width: 150
          fontSize: 16
          fontFamily: "Interstate"
          parent: this
          textAlign: "right"
          color: "#53565A"
     cardNametxt = new TextLayer
          parent: this
          fontSize: 16
          fontFamily: "Interstate"
          color: "#53565A"
          x: 20
          y: 15
          text: cardName
     lastFourtxt = new TextLayer
          parent: this
          fontSize: 12
          fontFamily: "Interstate"
          x: 20
          y: 40
          text: "..." + lastFour
        

    constructor: (options) ->
         
        # Get default layer functionality 
        super(options)
 
        # Set default properties 
        @states.lift =
          shadowSpread: 5
          shadowY: 3
          shadowColor: "rgba(120, 120, 120, 0.28)"
          animationOptions: 
           time: .1
         @states.down =
          shadowSpread: 2
          shadowY: 1
          shadowColor: "rgba(120, 120, 120, 0.18)"
          animationOptions: 
           time: .1
        @width = 345
        @height = 137
        @backgroundColor = "white"
        @borderRadius = 4
        @midX = Screen.midX
        @parent = Dashboard
        @opacity = 0
        @image = cardchrome.image
        
        @cardName = "Untitled Card"
        @amount = "$0"
        @timeLeft = 7
        
        @shadowY = 1
        @shadowBlur = 4
        @shadowSpread = 0 
        @shadowColor = "rgba(120, 120, 120, 0.18)"
        
        @onTap ->
         viewController.showNext(CardDetailPage)
         viewDetail()
         
        
        ###
        onTapStart ->
         @animate("lift")
         viewController.scroll.scrollVertical = false
        @onTapEnd ->
         @animate("down")
         viewController.scroll.scrollVertical = true
       ###

# Components & Layers

viewController = new FlowComponent
viewController.header = NavBar
viewController.showNext(Dashboard)
viewController.scroll.backgroundColor = "#EEEEEE"



Dashboard.parent = viewController.scroll.content

statusBar.index = 99

InputModule = require "input"

# Text Input Fields

input = new InputModule.Input
  setup: false # Change to true when positioning the input so you can see it
  y: -30 # y position
  x: -5 # x position
  width: 245
  height: 10
  placeholder: "Search"
  fontSize: 16
  textColor: "#FFFFFF"
  fontFamily: "Interstate"
  parent: searchunderline
  virtualKeyboard: true

newCardNameField = new InputModule.Input
  setup: false # Change to true when positioning the input so you can see it
  y: 100 # y position
  x: 18 # x position
  width: 245
  height: 10
  placeholder: "Card Name / Purpose"
  fontSize: 14
  textColor: "#002D72"
  fontFamily: "Interstate"
  parent: AddCardPage
  virtualKeyboard: true
Events.wrap(newCardNameField.form).addEventListener "submit", (event) ->
	event.preventDefault()
newCardNameField.on "keyup", ->
	newCardName = newCardNameField.value


dollarRequestField = new InputModule.Input
  setup: false # Change to true when positioning the input so you can see it
  y: 183 # y position
  x: 18 # x position
  width: 245
  height: 10
  placeholder: "$0.00 (Request Amount)"
  fontSize: 14
  textColor: "#002D72"
  fontFamily: "Interstate"
  parent: AddCardPage
  virtualKeyboard: true
Events.wrap(dollarRequestField.form).addEventListener "submit", (event) ->
	event.preventDefault()

# Detail Page Setup

detailScroll = new ScrollComponent
	width: Screen.width
	y: 267
	height: 400
	scrollHorizontal: false
	parent: CardDetailPage
	contentInset: -100

detailsContainer.parent = detailScroll.content
detailsContainer.y = 40

glow= new Layer
	width: 600
	height: 600
	opacity: 0.1
	borderRadius: '100%'
	parent: realCard
	z: 10
	midX: parent.midX

glow.style =
	"background": "radial-gradient( rgba(255,255,255,1) 0%, rgba(255,255,255,0) 60%)"

realCard.clip = true

#Filter Page

all = new Layer y: 120
active = new Layer y: 162
completed = new Layer y: 204
expired = new Layer y: 246
toreview = new Layer y: 288
pending = new Layer y: 330
rejected = new Layer y: 372

cardFilterStatus = [all, active, completed, expired, toreview, pending, rejected]
filterNames = ["All Cards", "Active", "Completed", "Expired", "To Review", "Pending", "Rejected"]

for i in [0..cardFilterStatus.length - 1]
	for layer in cardFilterStatus
		layer.width = Screen.width
		layer.height = 40
		layer.parent = FilterPage
		layer.backgroundColor = "rgba(255, 255, 255, .05)"
		layer.onClick ->
			if this.backgroundColor.color is "rgba(255, 255, 255, .05)"
				cardFilterStatus.forEach (layer) ->
					if layer isnt cardFilterStatus[i]
						layer.backgroundColor = "rgba(255, 255, 255, .05)"
				this.backgroundColor = "rgba(255, 255, 255, .15)"
	cardFilterStatus[0].backgroundColor = "rgba(255, 255, 255, .15)"
	text = new TextLayer
		parent: cardFilterStatus[i]
		text: filterNames[i]
		fontFamily: "Interstate-Bold"
		fontSize: 14
		color: "white"
		x: 20
		y: 13
	i = i + 1

newold = new Layer y: 470
oldnew = new Layer y: 512
hilo = new Layer y: 554
lohi = new Layer y: 596

cardSort = [newold, oldnew, hilo, lohi]

sortNames = ["Date: New to Old", "Date: Old to New", "Request Amount: High to Low", "Request Amount: Low to High"]

for i in [0..cardSort.length - 1]
	for layer in cardSort
		layer.width = Screen.width
		layer.height = 40
		layer.parent = FilterPage
		layer.backgroundColor = "rgba(255, 255, 255, .05)"
		layer.onClick ->
			if this.backgroundColor.color is "rgba(255, 255, 255, .05)"
				cardSort.forEach (layer) ->
					if layer isnt cardSort[i]
						layer.backgroundColor = "rgba(255, 255, 255, .05)"
				this.backgroundColor = "rgba(255, 255, 255, .15)"
	cardSort[0].backgroundColor = "rgba(255, 255, 255, .15)"


	
	text = new TextLayer
		parent: cardSort[i]
		text: sortNames[i]
		fontFamily: "Interstate-Bold"
		fontSize: 14
		color: "white"
		x: 20
		y: 13
	i = i + 1



# States

d1.states.hide = 
	y: d1.y + 200
	opacity: 0
	animationOptions:
		time: .1

d2.states.hide = 
	y: d2.y + 200
	opacity: 0
	animationOptions:
		time: .1

d3.states.hide = 
	y: d3.y + 200
	opacity: 0
	animationOptions:
		time: .1

d4.states.hide = 
	y: d4.y + 200
	opacity: 0
	animationOptions:
		time: .1

d5.states.hide = 
	y: d5.y + 200
	opacity: 0
	animationOptions:
		time: .1

d6.states.hide = 
	y: d6.y + 200
	opacity: 0
	animationOptions:
		time: .1

realCard.states.normal =
	rotationX: 0
	rotationY: 0
	z: 1
	midX: Screen.midX
	y: 20
	animationOptions:
		time: .2

realCard.states.hide =
	rotationX: -90
	rotationY: 0
	z: -200
	midX: Screen.midX
	y: 20
	animationOptions:
		time: 1

realCard.states.open =
	rotationX: 0
	rotationY: 0
	midX: Screen.midX
	y: 20
	z: 1
	animationOptions:
		time: .5

realCard.z = 1
detailBG.z = -20
NavBarBG.states.alerts =
	backgroundColor: "rgb(0, 188, 240)"
	animationOptions:
		time: .2

NavBarBG.states.normal =
	backgroundColor: "rgb(0, 45, 114)"
	animationOptions:
		time: .2

NavBar.states.alerts = 
	height: 70
	options:
		colorModel: "rbg"
	animationOptions:
		time: .2
		curve: Bezier

NavBar.states.allcards = 
	height: 122
	backgroundColor: "rgb(0, 45, 114)"
	options:
		colorModel: "rbg"
	animationOptions:
		time: .2
		curve: Bezier

NavBar.states.dashboard =
	height: 122
	backgroundColor: "rgb(0, 45, 114)"
	options:
		colorModel: "rbg"
	animationOptions:
		time: .2
		curve: Bezier

backArrow.states.show =
	opacity: 1

backArrow.states.hide =
	opacity: 0
	animationOptions:
		time: .1

hamb.states.show =
	opacity: 1
hamb.states.hide =
	opacity: 0
	animationOptions:
		time: .1

searchButton.states.show =
	opacity: 1

searchButton.states.hide =
	opacity: 0
	animationOptions:
		time: .1

searchunderline.states.show =
	opacity: 1
	width: 293
	animationOptions:
		time: .4

searchunderline.states.hide =
	opacity: 0
	width: 0
	animationOptions:
		time: .2

Cancel.states.show =
	opacity: 1

Cancel.states.hide =
	opacity: 0
	animationOptions:
		time: .1

pageTitle.states.show =
	opacity: 1

pageTitle.states.hide =
	opacity: 0
	animationOptions:
		time: .1

filterButton.states.show =
	opacity: 1
	y: 70
	animationOptions:
		time: .2

filterButton.states.hide =
	opacity: 0
	y: 0
	animationOptions:
		time: .5

addCard.states.show =
	opacity: 1

addCard.states.hide =
	opacity: 0
	animationOptions:
		time: .1

alertsContainer.states.show =
	opacity: 1
	y: 67
	animationOptions:
		time: .2

alertsContainer.states.hide =
	y: 50
	opacity: 0
	animationOptions:
		time: .2

# Nav Functions

viewDetail = () ->
	NavBar.animate("alerts")
	alertsContainer.animate("hide")
	Utils.delay .2, ->
		alertsContainer.visible = false
	backArrow.animate("show")
	backArrow.visible = true
	hamb.animate("hide")
	hamb.visible = false
	pageTitle.text = "Meal Expense Card"
	d1.animate("default")
	Utils.delay .1, ->
		d2.animate("default")
		Utils.delay .1, ->
			d3.animate("default")
			Utils.delay .1, ->
				d3.animate("default")
				Utils.delay .1, ->
					d4.animate("default")
					Utils.delay .1, ->
						d5.animate("default")
						Utils.delay .1, ->
							d6.animate("default")
	realCard.animate("open")
	detailScroll.scrollToPoint(
		x: 0, y: 400
		true 
		curve: Bezier.ease
		)

detailScroll.on "change:y", ->
	print detailScroll.y

viewAlerts = () ->
	NavBar.animate("alerts")
	NavBarBG.animate("alerts")
	viewController.showNext(Alerts)
	viewController.scroll.backgroundColor = "#EEEEEE"
	backArrow.animate("show")
	backArrow.visible = true
	hamb.animate("hide")
	hamb.visible = false
	searchButton.visible = false
	searchunderline.visible = false
	Cancel.visible = false
	alertsContainer.animate("hide")
	viewController.scroll.content.y = 70
	viewController.scroll.contentInset =
		top: 70
	Utils.delay .1, ->
		alertsContainer.visible = false
	pageTitle.text = "Review Cards"


leaveAlerts = () ->
	viewController.showPrevious()
	viewController.scroll.backgroundColor = "#EEEEEE"
	NavBar.animate("dashboard")
	NavBarBG.animate("normal")
	backArrow.animate("hide")
	backArrow.visible = false
	hamb.visible = true
	hamb.animate("show")
	searchButton.visible = false
	Cancel.visible = false
	searchunderline.visible = false
	alertsContainer.animate("show")
	alertsContainer.visible = true
	viewController.scroll.content.y = 70
	viewController.scroll.contentInset =
		top: 70
	pageTitle.text = "Dashboard"
	d1.stateSwitch("hide")
	d2.stateSwitch("hide")
	d3.stateSwitch("hide")
	d4.stateSwitch("hide")
	d5.stateSwitch("hide")
	d6.stateSwitch("hide")
	Utils.delay .3, ->
		realCard.stateSwitch("hide")

viewDashboard = () ->
	viewController.showNext(Dashboard)
	viewController.scroll.backgroundColor = "#EEEEEE"
	NavBar.animate("dashboard")
	backArrow.animate("hide")
	backArrow.visible = false
	hamb.visible = true
	hamb.animate("show")
	searchButton.animate("hide")
	searchButton.visible = false
	alertsContainer.animate("show")
	alertsContainer.visible = true
	viewController.scroll.content.y = 70
	viewController.scroll.contentInset =
		top: 70
	filterButton.visible = false
	filterButton.animate("hide")
	pageTitle.text = "Dashboard"

viewAll = () ->
	viewController.showNext(AllCards)
	viewController.scroll.backgroundColor = "#EEEEEE"
	NavBar.animate("allcards")
	searchButton.animate("show")
	searchButton.visible = true
	Cancel.visible = false
	searchunderline.visible = false
	filterButton.animate("show")
	filterButton.visible = true
	alertsContainer.animate("hide")
	Utils.delay .2, ->
		alertsContainer.visible = false
	pageTitle.text = "All Cards"

SearchCards = () ->
	searchButton.animate("hide")
	Cancel.animate("show")
	searchunderline.animate("show")
	searchButton.visible = false
	searchunderline.visible = true
	Cancel.visible = true
	pageTitle.animate("hide")
	hamb.animate("hide")
	addCard.animate("hide")
	input.focus()
	addCard.visible = false
	NavBar.animate("alerts")
	filterButton.visible = false
	filterButton.animate("hide")
	viewController.scroll.content.y = 70
	viewController.scroll.contentInset =
		top: 70

CancelSearch = () ->
	searchButton.animate("show")
	Cancel.animate("hide")
	searchunderline.animate("hide")
	searchButton.visible = true
	Cancel.visible = false
	pageTitle.animate("show")
	hamb.animate("show")
	addCard.animate("show")
	searchunderline.visible = false
	addCard.visible = true
	NavBar.animate("dashboard")
	filterButton.animate("show")
	filterButton.visible = true
	viewController.scroll.content.y = 120
	viewController.scroll.contentInset =
		top: 120

# Card Functions

addCards = (amount, timeLeft, cardName) ->
	
	card = new Card
		y: 135 + numOfCards * 150
	
	lastFour = Utils.round(Utils.randomNumber(1000,9999))
	
	card.MakeCard(amount, timeLeft, cardName, lastFour)
	
	numOfCards = numOfCards + 1
	
	Utils.delay .5, ->
		fadein = new Animation card,
			opacity: 1
			options:
				time: .4
		
		fadein.start()
		
		expandanim = new Animation Dashboard,
			height: 667 + (numOfCards - 1) * 150
			options:
				time:.3
		expandanim.start()

# Animation & Transitions

# Events
activeArea.perspective = 100
touchDown = false
NavBar.stateSwitch("dashboard")
NavBarBG.stateSwitch("normal")
backArrow.stateSwitch("hide")
searchButton.stateSwitch("hide")
Cancel.stateSwitch("hide")
searchunderline.stateSwitch("hide")
filterButton.stateSwitch("hide")
filterButton.visible = false
searchButton.visible = false
Cancel.visible = false
backArrow.visible = false
searchunderline.visible = false
pageTitle.text = "Dashboard"
d1.stateSwitch("hide")
d2.stateSwitch("hide")
d3.stateSwitch("hide")
d4.stateSwitch("hide")
d5.stateSwitch("hide")
d6.stateSwitch("hide")
realCard.stateSwitch("hide")

addCards("$150.00", "12 Hours", "Meal Expense Card", "7654")

addCards("$250.00", "4 Days", "Production Costs", "7654")

hamb.onClick (event, layer) ->
	viewController.showOverlayLeft(MenuBG)

MenuBG.onSwipeLeftEnd (event, layer) ->
	viewController.showPrevious()

menuHamb.onClick (event, layer) ->
	viewController.showPrevious()

alertsButton.onClick (event, layer) ->
	viewAlerts()

backArrow.onClick (events, layer) ->
	leaveAlerts()

addCard.onClick (events, layer) ->
	viewController.showOverlayBottom(AddCardPage)

ViewAllButton.onClick (events, layer) ->
	viewAll()

menuAllCards.onClick (events, layer) ->
	if viewController.previous.name is "AllCards"
		viewController.showPrevious()
	else
		viewAll()


menuDashboard.onClick (event, layers) ->
	if viewController.previous.name is "Dashboard"
		viewController.showPrevious()
	else
		viewDashboard()

searchButton.onClick (event, layers) ->
	SearchCards()

Cancel.onClick (event, layers) ->
	CancelSearch()

closeAdd.onClick (events, layers) ->
	viewController.showPrevious()

requestCardButton.onClick (events, layers) ->
	addCards(dollarRequestField.value, "7 Days", newCardName)
	viewController.showPrevious()
	newCardNameField.value = null
	dollarRequestField.value = null
	viewController.scroll.updateContent()

menuRequest.onClick (events, layers) ->
	viewController.showPrevious()
	viewController.showOverlayBottom(AddCardPage)

filterButton.onClick (events, layers) ->
	viewController.showOverlayBottom(FilterPage)

filterDone.onClick (events, layers) ->
	viewController.showPrevious()

# Card Detail Pan Interaction

activeArea.onPan (event, layer) ->
		
	delta =
		x: activeArea.midX - Events.touchEvent(event).clientX
		y: activeArea.midY - Events.touchEvent(event).clientY

	realCard.rotationX = Utils.modulate delta.y, [0, activeArea.midX], [0, 1] 
	realCard.rotationY = Utils.modulate delta.x, [0, activeArea.midY], [0, -1]
	realCard.y = Utils.modulate -delta.y, [0, activeArea.midY], [15, 25]
	realCard.midX = Utils.modulate -delta.x, [0, activeArea.midY], [realCard.parent.midX, realCard.parent.midX + 10]
	glow.x = Utils.modulate delta.x, [0, realCard.midX], [-200, 200]
	glow.y = Utils.modulate delta.y, [0, realCard.midY], [-200, 200]
	glow.opacity= Utils.modulate delta.x, [0, activeArea.midX], [0.3, 1]

realCard.onPanEnd (event, layer) ->
	realCard.animate("normal")
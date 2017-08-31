# Functions

viewAlerts = () ->
	NavBar.animate("alerts")
	viewController.showNext(Alerts, animate: true)
	backArrow.animate("show")
	backArrow.visible = true
	hamb.animate("hide")
	hamb.visible = false
	viewController.scroll.backgroundColor = "rgb(0, 188, 240)"
	searchButton.visible = false
	Cancel.visible = false

leaveAlerts = () ->
	viewController.showPrevious()
	NavBar.animate("normal")
	backArrow.animate("hide")
	backArrow.visible = false
	hamb.visible = true
	hamb.animate("show")
	viewController.scroll.backgroundColor = "rgb(0, 45, 114)"
	searchButton.visible = false
	Cancel.visible = false

viewDashboard = () ->
	viewController.showNext(Dashboard)
	NavBar.animate("normal")
	backArrow.animate("hide")
	backArrow.visible = false
	hamb.visible = true
	hamb.animate("show")
	viewController.scroll.backgroundColor = "rgb(0, 45, 114)"
	searchButton.animate("hide")
	searchButton.visible = false
	Cancel.visible = false

viewAll = () ->
	viewController.showNext(AllCards)
	searchButton.animate("show")
	viewController.scroll.backgroundColor = "rgb(0, 45, 114)"
	searchButton.visible = true
	Cancel.visible = false

SearchCards = () ->
	searchButton.animate("hide")
	Cancel.animate("show")
	searchunderline.animate("show")
	searchButton.visible = false
	Cancel.visible = true
	pageTitle.animate("hide")
	hamb.animate("hide")
	addCard.animate("hide")
	input.focus()

CancelSearch = () ->
	searchButton.animate("show")
	Cancel.animate("hide")
	searchunderline.animate("hide")
	searchButton.visible = true
	Cancel.visible = false
	pageTitle.animate("show")
	hamb.animate("show")
	addCard.animate("show")

addCards = (amount, timeLeft, cardName) ->
	
	card = new Card
		y: 135 + numOfCards * 135
	
	card.MakeCard(amount, timeLeft, cardName)
	
	fadein = new Animation card,
		opacity: 1
		options:
			time: .4
	
	fadein.start()
	
	numOfCards = numOfCards + 1
	
	expandanim = new Animation Dashboard,
		height: 667 + (numOfCards - 1) * 129
		options:
			time:.3
	expandanim.start()
	viewController.scroll.updateContent()

	# Functions

viewAlerts = () ->
	NavBar.animate("alerts")
	viewController.showNext(Alerts, animate: true)
	backArrow.animate("show")
	backArrow.visible = true
	hamb.animate("hide")
	hamb.visible = false
	viewController.scroll.backgroundColor = "rgb(0, 188, 240)"
	searchButton.visible = false
	Cancel.visible = false

leaveAlerts = () ->
	viewController.showPrevious()
	NavBar.animate("normal")
	backArrow.animate("hide")
	backArrow.visible = false
	hamb.visible = true
	hamb.animate("show")
	viewController.scroll.backgroundColor = "rgb(0, 45, 114)"
	searchButton.visible = false
	Cancel.visible = false

viewDashboard = () ->
	viewController.showNext(Dashboard)
	NavBar.animate("normal")
	backArrow.animate("hide")
	backArrow.visible = false
	hamb.visible = true
	hamb.animate("show")
	viewController.scroll.backgroundColor = "rgb(0, 45, 114)"
	searchButton.animate("hide")
	searchButton.visible = false
	Cancel.visible = false

viewAll = () ->
	viewController.showNext(AllCards)
	searchButton.animate("show")
	viewController.scroll.backgroundColor = "rgb(0, 45, 114)"
	searchButton.visible = true
	Cancel.visible = false

SearchCards = () ->
	searchButton.animate("hide")
	Cancel.animate("show")
	searchunderline.animate("show")
	searchButton.visible = false
	Cancel.visible = true
	pageTitle.animate("hide")
	hamb.animate("hide")
	addCard.animate("hide")
	input.focus()

CancelSearch = () ->
	searchButton.animate("show")
	Cancel.animate("hide")
	searchunderline.animate("hide")
	searchButton.visible = true
	Cancel.visible = false
	pageTitle.animate("show")
	hamb.animate("show")
	addCard.animate("show")

addCards = (amount, timeLeft, cardName) ->
	
	card = new Card
		y: 135 + numOfCards * 135
	
	card.MakeCard(amount, timeLeft, cardName)
	
	fadein = new Animation card,
		opacity: 1
		options:
			time: .4
	
	fadein.start()
	
	numOfCards = numOfCards + 1
	
	expandanim = new Animation Dashboard,
		height: 667 + (numOfCards - 1) * 129
		options:
			time:.3
	expandanim.start()
	viewController.scroll.updateContent()
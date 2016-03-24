var Carousel = function (wrap, settings) {

		this.wrap = wrap
		this.settings = settings

		this.bindScrollLeft = function(el, velocity) {
			bindScroll(el, -velocity)
		}
		this.bindScrollRight = function(el, velocity) {
			bindScroll(el, velocity)
		}

		//Initialization
		var setup = function() {
			wrap.addEventListener('scroll', animateElements)
			animateElements()
			if(settings !== undefined && settings.infinteScroll) {
				wrap.addEventListener('scroll', infinteScroll)
				infinteScroll()
			}
		}

		//Main functions
		var animateElements = function() {
			Array.prototype.forEach.call(wrap.children, animateElement)
		}
		var animateElement = function(el) {
			var relativeOffsetCenter = function(el) {
				return (el.offsetLeft - wrap.scrollLeft - wrap.offsetLeft - wrap.offsetWidth / 2 + el.offsetWidth / 2) / wrap.offsetWidth
			}
			var scale = 1 - Math.pow(( relativeOffsetCenter(el) ), 2)
			var opacity = 1 -1.5 * Math.pow(( relativeOffsetCenter(el) ), 2)
				el.style.webkitTransform =
				el.style.MozTransform =
				el.style.msTransform =
				el.style.OTransform =
				el.style.transform =
				"scale(" + scale + ")"
				el.style.opacity = opacity
		}
		var infinteScroll = function() {
			if (wrap.scrollLeft <= wrap.firstElementChild.offsetWidth) {
				wrap.insertBefore(wrap.lastElementChild,wrap.firstElementChild)
				wrap.scrollLeft += wrap.firstElementChild.offsetWidth
			} if(wrap.scrollWidth - wrap.scrollLeft - wrap.offsetWidth < wrap.lastElementChild.offsetWidth){
				var el = wrap.firstElementChild
				wrap.appendChild(el)
				wrap.scrollLeft -= wrap.firstElementChild.offsetWidth
			}
		}

		var bindScroll = function(el, velocity) {
			var action
			var stopAction = function() {
				clearInterval(action)
			}

			el.addEventListener('mousedown', function(){
				action = setInterval(function() {
	 				wrap.scrollLeft += velocity
	 			}, 1)
			})
			el.addEventListener('mouseup', stopAction)
			el.addEventListener('mouseout', stopAction)
		}

		setup()
}

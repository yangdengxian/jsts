import extend from '../../../../../extend';
import GeometryCollection from '../GeometryCollection';
export default function ShortCircuitedGeometryVisitor() {
	this.__isDone = false;
}
extend(ShortCircuitedGeometryVisitor.prototype, {
	applyTo: function (geom) {
		for (var i = 0; i < geom.getNumGeometries() && !this.__isDone; i++) {
			var element = geom.getGeometryN(i);
			if (!(element instanceof GeometryCollection)) {
				this.visit(element);
				if (this.isDone()) {
					this.__isDone = true;
					return null;
				}
			} else this.applyTo(element);
		}
	},
	interfaces_: function () {
		return [];
	},
	getClass: function () {
		return ShortCircuitedGeometryVisitor;
	}
});

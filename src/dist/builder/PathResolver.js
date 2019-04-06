"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PathResolver {
    constructor() {
        this.pathExtractor = new RegExp("(\\.\\w*)+", "i");
    }
    getPath(name) {
        const match = this.pathExtractor.exec(name.toString());
        if (match == null) {
            throw new Error("The function does not contain a statement matching 'return variableName;'");
        }
        const result = match[0].substring(1);
        return result.split(".").join("/");
    }
    resolve(expression) {
        if (this.isPathFactory(expression)) {
            return this.getPath(expression);
        }
        else {
            return expression.toString();
        }
    }
    isPathFactory(arg) {
        return typeof arg === "function" && arg != null;
    }
}
exports.PathResolver = PathResolver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGF0aFJlc29sdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vbGliL2J1aWxkZXIvUGF0aFJlc29sdmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsTUFBYSxZQUFZO0lBSXZCO1FBQ0UsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxZQUFZLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVNLE9BQU8sQ0FBVSxJQUF5QjtRQUMvQyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUN2RCxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7WUFDakIsTUFBTSxJQUFJLEtBQUssQ0FBQywyRUFBMkUsQ0FBQyxDQUFDO1NBQzlGO1FBQ0QsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNyQyxPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFTSxPQUFPLENBQXFCLFVBQXNEO1FBQ3ZGLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNsQyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDakM7YUFBTTtZQUNMLE9BQU8sVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQzlCO0lBQ0gsQ0FBQztJQUVPLGFBQWEsQ0FBbUQsR0FBUTtRQUM5RSxPQUFPLE9BQU8sR0FBRyxLQUFLLFVBQVUsSUFBSSxHQUFpRCxJQUFJLElBQUksQ0FBQztJQUNoRyxDQUFDO0NBQ0Y7QUE1QkQsb0NBNEJDIn0=
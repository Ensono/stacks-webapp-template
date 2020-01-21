"use strict";
// const type_enum = Object.freeze()
Object.defineProperty(exports, "__esModule", { value: true });
var BaseFlowType;
(function (BaseFlowType) {
    BaseFlowType["BUILD"] = "build";
    BaseFlowType["SOURCE"] = "src";
    BaseFlowType["DEPLOY"] = "deploy";
    BaseFlowType["DOCS"] = "docs";
})(BaseFlowType || (BaseFlowType = {}));
exports.BaseFlowType = BaseFlowType;
function getSourceFolders() {
    return [{
            path: "templates/build",
            replaceFiles: [""],
            replaceVals: [""]
        }];
}
exports.getSourceFolders = getSourceFolders;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZU1hcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGVNYXBwZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9DQUFvQzs7QUFFcEMsSUFBSyxZQUtKO0FBTEQsV0FBSyxZQUFZO0lBQ2IsK0JBQWUsQ0FBQTtJQUNmLDhCQUFjLENBQUE7SUFDZCxpQ0FBaUIsQ0FBQTtJQUNqQiw2QkFBYSxDQUFBO0FBQ2pCLENBQUMsRUFMSSxZQUFZLEtBQVosWUFBWSxRQUtoQjtBQXFCTyxvQ0FBWTtBQVJwQixTQUFTLGdCQUFnQjtJQUNyQixPQUFPLENBQUM7WUFDSixJQUFJLEVBQUUsaUJBQWlCO1lBQ3ZCLFlBQVksRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUNsQixXQUFXLEVBQUUsQ0FBQyxFQUFFLENBQUM7U0FDcEIsQ0FBQyxDQUFBO0FBQ04sQ0FBQztBQUVpQyw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBjb25zdCB0eXBlX2VudW0gPSBPYmplY3QuZnJlZXplKClcblxuZW51bSBCYXNlRmxvd1R5cGUge1xuICAgIEJVSUxEID0gXCJidWlsZFwiLFxuICAgIFNPVVJDRSA9IFwic3JjXCIsXG4gICAgREVQTE9ZID0gXCJkZXBsb3lcIixcbiAgICBET0NTID0gXCJkb2NzXCIgICBcbn1cblxuaW50ZXJmYWNlIGZpbGVNYXBwZXIge1xuICAgIG5hbWU6IHN0cmluZyxcbiAgICB0eXBlOiBCYXNlRmxvd1R5cGVcbn1cblxuaW50ZXJmYWNlIHNvdXJjZVN0cnVjdCB7XG4gICAgcGF0aDogc3RyaW5nLFxuICAgIHJlcGxhY2VGaWxlczogQXJyYXk8c3RyaW5nPixcbiAgICByZXBsYWNlVmFsczogQXJyYXk8c3RyaW5nPlxufVxuXG5mdW5jdGlvbiBnZXRTb3VyY2VGb2xkZXJzKCk6IEFycmF5PHNvdXJjZVN0cnVjdD4ge1xuICAgIHJldHVybiBbe1xuICAgICAgICBwYXRoOiBcInRlbXBsYXRlcy9idWlsZFwiLFxuICAgICAgICByZXBsYWNlRmlsZXM6IFtcIlwiXSxcbiAgICAgICAgcmVwbGFjZVZhbHM6IFtcIlwiXVxuICAgIH1dXG59XG5cbmV4cG9ydCB7QmFzZUZsb3dUeXBlLCBmaWxlTWFwcGVyLCBnZXRTb3VyY2VGb2xkZXJzIH1cbiJdfQ==
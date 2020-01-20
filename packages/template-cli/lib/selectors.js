"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./workers/base");
var FlowSelector;
(function (FlowSelector) {
    // 
})(FlowSelector || (FlowSelector = {}));
(function (FlowSelector) {
    async function option1(instructions) {
        return await base_1.ssr_aks_tfs(instructions);
    }
    FlowSelector.option1 = option1;
    async function option2(instructions) {
        return await base_1.csr_aks_tfs(instructions);
    }
    FlowSelector.option2 = option2;
})(FlowSelector || (FlowSelector = {}));
exports.default = FlowSelector;
// import { ssr_aks_tfs } from './workers/base'
// export { ssr_aks_tfs }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0b3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2VsZWN0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseUNBQXlEO0FBSXpELElBQUssWUFFSjtBQUZELFdBQUssWUFBWTtJQUNiLEdBQUc7QUFDUCxDQUFDLEVBRkksWUFBWSxLQUFaLFlBQVksUUFFaEI7QUFFRCxXQUFVLFlBQVk7SUFDWCxLQUFLLFVBQVUsT0FBTyxDQUFDLFlBQTBCO1FBQ3BELE9BQU8sTUFBTSxrQkFBVyxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQzFDLENBQUM7SUFGcUIsb0JBQU8sVUFFNUIsQ0FBQTtJQUNNLEtBQUssVUFBVSxPQUFPLENBQUMsWUFBb0I7UUFDOUMsT0FBTyxNQUFNLGtCQUFXLENBQUMsWUFBWSxDQUFDLENBQUE7SUFDMUMsQ0FBQztJQUZxQixvQkFBTyxVQUU1QixDQUFBO0FBQ0wsQ0FBQyxFQVBTLFlBQVksS0FBWixZQUFZLFFBT3JCO0FBRUQsa0JBQWUsWUFBWSxDQUFBO0FBRzNCLCtDQUErQztBQUUvQyx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzc3JfYWtzX3RmcywgY3NyX2Frc190ZnMgfSBmcm9tICcuL3dvcmtlcnMvYmFzZSdcbmltcG9ydCB7IFByb21wdEFuc3dlciB9IGZyb20gJy4vbW9kZWwvcHJvbXB0X2Fuc3dlcidcblxuXG5lbnVtIEZsb3dTZWxlY3RvciB7XG4gICAgLy8gXG59XG5cbm5hbWVzcGFjZSBGbG93U2VsZWN0b3Ige1xuICAgIGV4cG9ydCBhc3luYyBmdW5jdGlvbiBvcHRpb24xKGluc3RydWN0aW9uczogUHJvbXB0QW5zd2VyKTogUHJvbWlzZTxvYmplY3Q+IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHNzcl9ha3NfdGZzKGluc3RydWN0aW9ucylcbiAgICB9XG4gICAgZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG9wdGlvbjIoaW5zdHJ1Y3Rpb25zOiBzdHJpbmcpOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICByZXR1cm4gYXdhaXQgY3NyX2Frc190ZnMoaW5zdHJ1Y3Rpb25zKVxuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgRmxvd1NlbGVjdG9yXG5cblxuLy8gaW1wb3J0IHsgc3NyX2Frc190ZnMgfSBmcm9tICcuL3dvcmtlcnMvYmFzZSdcblxuLy8gZXhwb3J0IHsgc3NyX2Frc190ZnMgfVxuIl19
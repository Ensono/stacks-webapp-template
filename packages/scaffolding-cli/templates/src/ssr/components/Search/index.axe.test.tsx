import React from "react"
import {Search} from "."
import {accessibilityTestHelper} from "../../__tests__/axe/accessibilityHelper.test"

accessibilityTestHelper(<Search getSearchResults />)

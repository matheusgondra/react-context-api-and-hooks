import * as actionTypes from "./actions-types";

export const buildActions = (dispatch) => {
	return {
		increase: () => dispatch({ type: actionTypes.INCREASE }),
		decrease: () => dispatch({ type: actionTypes.DECREASE }),
		reset: () => dispatch({ type: actionTypes.RESET }),
		setCounter: (payload) => dispatch({ type: actionTypes.SET_COUNTER, payload }),
		asyncIncrease: async () => {
			dispatch({ type: actionTypes.ASYNC_INCREASE_START });

			return await new Promise((resolve) => {
				setTimeout(() => {
					dispatch({ type: actionTypes.ASYNC_INCREASE_END });
					resolve("RESOLVED!");
				}, 2000);
			});
		},
		asyncIncreaseError: async () => {
			dispatch({ type: actionTypes.ASYNC_INCREASE_START });

			return await new Promise((resolve, reject) => {
				setTimeout(() => {
					dispatch({ type: actionTypes.ASYNC_INCREASE_ERROR });
					reject(new Error("Deu ruim!"));
				}, 2000);
			});
		}
	};
};
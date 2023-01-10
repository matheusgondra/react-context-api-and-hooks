import { Button } from "../../components/Button";
import { Heading } from "../../components/Heading";
import { useCounterContext } from "../../contexts/CounterContext";

export const Home = () => {
	/* eslint-disable-next-line */
	const [state, actions] = useCounterContext();

	const handleError = () => {
		actions
			.asyncIncreaseError()
			.then((r) => console.log(r))
			.catch((e) => console.log(e.name, ":", e.message));
	};

	return (
		<div>
			<Heading />
			<div>
				<Button text="Increase" onButtonClick={actions.increase} />
				<Button text="Decrease" onButtonClick={actions.decrease} />
				<Button text="Reset" onButtonClick={actions.reset} />
				<Button text="Set 10" onButtonClick={() => actions.setCounter({ counter: 10 })} />
				<Button text="Set 100" onButtonClick={() => actions.setCounter({ counter: 100 })} />
				<Button disabled={state.loading} text="Async increase" onButtonClick={actions.asyncIncrease} />
				<Button disabled={state.loading} text="Async error" onButtonClick={handleError} />
			</div>
		</div>
	);
};

import React, {useState} from 'react';
import { Select } from "@inkjs/ui";
import {spawn} from 'child_process';
import {Box, Text} from 'ink';
import BigText from 'ink-big-text';
import Gradient from 'ink-gradient'



export default function App() {

	const [frameworksVisible, setFrameworksVisible] = useState<boolean>(true);
	const [frameworkIndexSelected, setFrameworkIndexSelected] = useState<number | null>(null);
	const [boilerplateIndexSelected, setBoilerplateIndexSelected] = useState<number | null>(null);

type GradientName = "cristal" | "teen" | "mind" | "morning" | "vice" | "passion" | "fruit" | "instagram" | "atlas" | "retro" | "summer" | "pastel" | "rainbow";

const gradientColors_array: GradientName[] = ["cristal", "teen", "mind", "morning", "vice", "passion", "fruit", "instagram", "atlas", "retro", "summer", "pastel", "rainbow"];


	 const getRandomColor = (): string => {
  const randomIndex = Math.floor(Math.random() * gradientColors_array.length);
  return gradientColors_array[randomIndex] || "fruit";
}

const [colorGradient] = useState<string>(getRandomColor());

	const frameworks_array = [
		"NextJS",
		"Vite",
		"Vue",
		"Laravel",
		"React Native + Expo",
		"Exit"
	];


	const boilerplates_array = [
    [
        {"name": "NextJS Official", "command": "npx create-next-app@latest"},
        {"name":"NextJS + Supabase","command":"npx create-next-app -e with-supabase"},
        {"name": "NextJS + Tailwind CSS", "command": "npx create-next-app@latest"},
        {"name": "NextJS + TypeScript", "command": "npx create-next-app@latest"},
        {"name": "Back", "command": "Back"}
    ],
    [
        {"name": "Vite + React", "command": "npm create vite@latest"},
        {"name": "Vite + Vue", "command": "npm create vite@latest"},
        {"name": "Vite + Svelte", "command": "npm create vite@latest"},
        {"name": "Back", "command": "Back"}
    ],
    [
        {"name": "Vue CLI", "command": "npm init vue@latest"},
        {"name": "Nuxt.js", "command": "npx nuxi init"},
        {"name": "Quasar Framework", "command": "npm init quasar"},
        {"name": "Back", "command": "Back"}
    ],
    [
        {"name": "Laravel New Project", "command": "composer create-project laravel/laravel"},
        {"name": "Laravel Breeze", "command": "composer require laravel/breeze --dev"},
        {"name": "Laravel Jetstream", "command": "composer require laravel/jetstream"},
        {"name": "Back", "command": "Back"}
    ],
    [
        {"name": "Expo CLI", "command": "npx create-expo-app"},
        {"name": "React Native CLI", "command": "npx react-native init"},
        {"name": "Expo with TypeScript", "command": "npx create-expo-app"},
        {"name": "Back", "command": "Back"}
    ]
];




  return (
		<>

            <Box flexDirection="column" width={'100%'} height={'100%'}>
                <Gradient name={colorGradient as GradientName}>
                    <BigText text="QuickPlate" />
                </Gradient>
                <Text>
										Choose a framework, then go with your preferred boilerplate.
                </Text>
            </Box>



		{frameworkIndexSelected === null && frameworksVisible && (
    <Select
		options={frameworks_array.map((fram, index) => ({
			label:fram,
			value:index.toString()
		}))}

    onChange={(value:string) => {
			const selectedIndex = parseInt(value, 10);

			if(selectedIndex === frameworks_array.length -1){
			process.exit(0);
			}
			else {
			setFrameworkIndexSelected(selectedIndex);
			}

    }}
  />
		)}


		{ frameworkIndexSelected !== null && boilerplates_array[frameworkIndexSelected] && (
    <Select
		options={boilerplates_array[frameworkIndexSelected].map((boilerplate, index) => ({

				label: boilerplate.name,
				value: index.toString()

		}))}

    onChange={(value:string) => {
			const selectedIndex = parseInt(value, 10);
			if(selectedIndex === boilerplates_array[frameworkIndexSelected]!.length -1){
			setFrameworkIndexSelected(null);
			}
			else{
			setBoilerplateIndexSelected(selectedIndex);



		if (frameworkIndexSelected !== null &&  boilerplates_array[frameworkIndexSelected] && boilerplates_array[frameworkIndexSelected][selectedIndex]) {
  	const selectedCommand = boilerplates_array[frameworkIndexSelected][selectedIndex].command;

  	if(selectedCommand){
		const command = spawn(selectedCommand, {
                    stdio: 'inherit',
                    shell: true
                  });


			command.on('error', (error) => {
  	 console.error(`Error while executing the command: ${error}`);
			});

      command.on('close', (code) => {
     console.log(`Command finished with code: ${code}`);
      });

     } else {
  	console.error('Command not found');
		}
		}


		setFrameworkIndexSelected(null);
		setBoilerplateIndexSelected(null);
		setFrameworksVisible(false);

			console.log(boilerplateIndexSelected);
			}
    }}
  />
	)}













</>




  )
}

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import {
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { useClose } from 'src/hooks/useClose';

import { IArticleState } from 'src/types/types';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

import { useState, useRef, useEffect, FormEvent } from 'react';


type ArticleParamsFormProps = {
	articleState: IArticleState;
	setArticleState: (p: IArticleState) => void
}


export const ArticleParamsForm = ({articleState, setArticleState}: ArticleParamsFormProps) => {
	const formRef = useRef<HTMLDivElement>(null);

	// открытие/закрытие формы
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	function toggleFormOpen() {
		setIsMenuOpen(!isMenuOpen);
	}

	// обновление состояния самой формы
	const [currentFormState, setFormState] = useState({
		fontFamilyOption: articleState.fontFamilyOption,
		fontColor: articleState.fontColor,
		backgroundColor: articleState.backgroundColor,
		contentWidth: articleState.contentWidth,
		fontSizeOption: articleState.fontSizeOption,
	});

	// для кнопки "сбросить" 
	function resetForm() {
		setFormState({
			fontFamilyOption: defaultArticleState.fontFamilyOption,
			fontColor: defaultArticleState.fontColor,
			backgroundColor: defaultArticleState.backgroundColor,
			contentWidth: defaultArticleState.contentWidth,
			fontSizeOption: defaultArticleState.fontSizeOption,
		});
		setArticleState(defaultArticleState);
	}

	// для кнопки "применить"
	function updateForm(event: FormEvent) {
		event.preventDefault();
		setFormState({
			fontFamilyOption: currentFormState.fontFamilyOption,
			fontColor: currentFormState.fontColor,
			backgroundColor: currentFormState.backgroundColor,
			contentWidth: currentFormState.contentWidth,
			fontSizeOption: currentFormState.fontSizeOption,
		});
		setArticleState(currentFormState);
	}

	// закрываем форму при клике вне сайдбара
	function closeMenu() {
		setIsMenuOpen(false);
	}

	useClose({
        isOpen: isMenuOpen,
        onClose: closeMenu,
        rootRef: formRef,
    });

	// useEffect(() => {
	// 	function handleClickOutside(event: MouseEvent) {
	// 	  if (formRef.current && !formRef.current.contains(event.target as Node) && isMenuOpen) {
	// 		setIsMenuOpen(false);
	// 	  }
	// 	}
	// 
	// 	document.addEventListener('mousedown', handleClickOutside);
	// 	// убираем обработчик после закрытия формы
	// 	return () => {
	// 	  document.removeEventListener('mousedown', handleClickOutside);
	// 	};
	// 	}, [isMenuOpen]
	// );

	

	return (
		<>
			<ArrowButton isMenuOpen={isMenuOpen} onClick={toggleFormOpen} />
			<aside ref={formRef} className={clsx(styles.container, {[styles.container_open]: isMenuOpen})}>
				<form className={styles.form} onSubmit={updateForm} onReset={resetForm}>
					<Text as={'h2'} size={31} weight={800} uppercase={true}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						selected={currentFormState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) =>
							setFormState((state) => ({
								...state,
								fontFamilyOption: option,
							}))
						}
					/>
					<RadioGroup
						options={fontSizeOptions}
						selected={currentFormState.fontSizeOption}
						title='Размер шрифта'
						name='Размер шрифта'
						onChange={(option) =>
							setFormState((state) => ({
								...state,
								fontSizeOption: option,
							}))
						}
					/>
					<Select
						options={fontColors}
						selected={currentFormState.fontColor}
						title='Цвет шрифта'
						onChange={(option) =>
							setFormState((state) => ({
								...state,
								fontColor: option,
							}))
						}
					/>
					<Separator />
					<Select
						options={backgroundColors}
						selected={currentFormState.backgroundColor}
						title='Цвет фона'
						onChange={(option) =>
							setFormState((state) => ({
								...state,
								backgroundColor: option,
							}))
						}
					/>
					<Select
						options={contentWidthArr}
						selected={currentFormState.contentWidth}
						title='Ширина контента'
						onChange={(option) =>
							setFormState((state) => ({
								...state,
								contentWidth: option,
							}))
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear'/>
						<Button title='Применить' htmlType='submit' type='apply'/>
					</div>
				</form>
			</aside>
		</>
	);
};

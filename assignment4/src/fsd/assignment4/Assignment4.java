package fsd.assignment4;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.IntFunction;
import java.util.function.IntSupplier;
import java.util.function.Predicate;

import de.vandermeer.asciitable.AsciiTable;

public class Assignment4 {
	
	private int start;
	private int increment;
	private int incrementFrequency;
	private int deduction;
	private int deductionFrequency;
	private int years;
	
	private List<Salary> incomeList = new ArrayList<>();

	private Scanner sc = new Scanner(System.in);
	
	private Predicate<String> intPredicate = str -> {
		try {
			Integer.parseInt(str);
			return true;
		} catch (Exception e) {
			return false;
		}
	};
	
	private IntSupplier intInput = () -> {
		String result = sc.nextLine();
		while (!intPredicate.test(result)) {
			System.out.println("Please input a number!");
			result = sc.nextLine();
		}
		return Integer.parseInt(result);
	};
	
	private Function<String, Integer> getInput = msg -> {
		int result = intInput.getAsInt();
		while (result <= 0) {
			System.out.println(msg);
			result = intInput.getAsInt();
		}
		return result;
	};

	private Function<String, Integer> getPositiveInput = msg -> {
		int result = intInput.getAsInt();
		while (result < 0) {
			System.out.println(msg);
			result = intInput.getAsInt();
		}
		return result;
	};

	private Function<String, Integer> getChoiceInput = msg -> {
		int result = intInput.getAsInt();
		while (result != 1 && result != 2 && result != 3  && result != 4) {
			System.out.println(msg);
			result = intInput.getAsInt();
		}
		return result;
	};
	
	private IntFunction<Integer> getFrequency = i -> {
		switch (i) {
		case 1:
			return 12; //monthly
		case 2:
			return 4; //quarterly
		case 3:
			return 2; //half-yearly
		case 4:
			return 1; //annually
		default :
			return 0;
		}
	};
	
	private Consumer<List<Salary>> printIncrement = list -> {

		AsciiTable at = new AsciiTable();
		at.addRule();
		at.addRow("Year", "Starting Salary", "Number of Increments", "Increment %", "Increment Amount");
		for (int i = 0; i < list.size(); i++) {
			at.addRule();
			at.addRow(i + 1, list.get(i).getStartSalary(), getFrequency.apply(incrementFrequency), increment, list.get(i).getIncrement());
		}
		at.addRule();
		
		String rend = at.render();
		System.out.println("a.Increment Report");
		System.out.println(rend);
	};
	
	private Consumer<List<Salary>> printDeduction = list -> {

		AsciiTable at = new AsciiTable();
		at.addRule();
		at.addRow("Year", "Starting Salary", "Number of deductions", "Deduction %", "Deduction Amount");
		for (int i = 0; i < list.size(); i++) {
			at.addRule();
			at.addRow(i + 1, list.get(i).getStartSalary(), getFrequency.apply(deductionFrequency), deduction, list.get(i).getDeduction());
		}
		at.addRule();
		
		String rend = at.render();
		System.out.println("b.Deduction Report");
		System.out.println(rend);
	};

	
	private Consumer<List<Salary>> printIncome = list -> {

		AsciiTable at = new AsciiTable();
		at.addRule();
		at.addRow("Year", "Starting Salary", "Increment Amount", "Deduction Amount", "Salary Growth");
		for (int i = 0; i < list.size(); i++) {
			at.addRule();
			at.addRow(i + 1, list.get(i).getStartSalary(), list.get(i).getIncrement(), list.get(i).getDeduction(), list.get(i).getGrowth());
		}
		at.addRule();
		
		String rend = at.render();
		System.out.println("c.Prediction");
		System.out.println(rend);
	};
	
	public static void main(String[] args) {
		Assignment4 assignment4 = new Assignment4();
		assignment4.getInput();
		

		assignment4.calc();
		
		assignment4.print();
	}

	private void print() {
		printIncrement.accept(incomeList);
		printDeduction.accept(incomeList);
		printIncome.accept(incomeList);
	}

	private void calc() {
		int incrementTimes = getFrequency.apply(incrementFrequency);
		int deductionTimes = getFrequency.apply(deductionFrequency);
		for (int i = 0; i < years; i++) {
			Salary income = new Salary();
			if (i == 0) {
				income.setStartSalary((double)start);
			} else {
				income.setStartSalary(incomeList.get(i - 1).getSalary());
			}
			if (incrementTimes >= deductionTimes) {
				int index = incrementTimes / deductionTimes;
				for (int m = 0; m < incrementTimes; m ++) {
					income.increment(increment);
					if ((m + 1) % index == 0) {
						income.deduction(deduction);
					}
				}
			} else {
				int index = deductionTimes / incrementTimes;
				for (int m = 0; m < deductionTimes; m ++) {
					if ((m + 1) % index == 0) {
						income.increment(increment);
					}
					income.deduction(deduction);
				}
			}
			incomeList.add(income);
		}
	}

	private void getInput() {
		System.out.println("Welcome to the Income Predction System!");
		System.out.println("Please input your starting salary:");
		start = getInput.apply("Please input a number more than 1 for the starting salary!");
		
		System.out.println("Please input the percent of increment:");
		increment  = getPositiveInput.apply("Please input a positive number for the percent of increment!");
		
		System.out.println("Please input the frequency of increment: 1.monthly 2.quarterly 3.half-yearly 4.annually");
		incrementFrequency  = getChoiceInput.apply("Please input 1.monthly 2.quarterly 3.half-yearly 4.annually!");

		System.out.println("Please input the percent of deductions:");
		deduction  = getPositiveInput.apply("Please input a positive number the percent of deductions!");

		System.out.println("Please input the deduction on increment: 1.monthly 2.quarterly 3.half-yearly 4.annually");
		deductionFrequency  = getChoiceInput.apply("Please input 1.monthly 2.quarterly 3.half-yearly 4.annually!");

		System.out.println("Please input the prediction for years:");
		years  = getInput.apply("Please input a number more than 1 for the prediction years!");
		
	}
}



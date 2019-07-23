package fsd.assignment4;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class Salary {
	private double startSalary;
	private double increment;
	private double deduction;
	
	List<Double> incrementList = new ArrayList<>();

	public Double getStartSalary() {
		return startSalary;
	}

	public void setStartSalary(Double startSalary) {
		this.startSalary = startSalary;
	}
	
	public Double getIncrement() {
		BigDecimal db = BigDecimal.valueOf(increment);
		return db.setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();
	}

	public void setIncrement(Double increment) {
		this.increment = increment;
	}

	public Double getDeduction() {
		BigDecimal db = BigDecimal.valueOf(deduction);
		return db.setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();
	}

	public void setDeduction(Double deduction) {
		this.deduction = deduction;
	}

	public Double getSalary() {
		double result = this.startSalary + this.increment - this.deduction;
		BigDecimal db = BigDecimal.valueOf(result);
		return db.setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();
	}

	public Double getGrowth() {
		double result = this.increment - this.deduction;
		BigDecimal db = BigDecimal.valueOf(result);
		return db.setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();
	}
	
	public void increment(double percent) {
		this.increment += this.getSalary() * (percent/100);
	}
	
	public void deduction(double percent) {
		this.deduction += this.getSalary() * (percent/100);
	}
}

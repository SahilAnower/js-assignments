import java.util.*;

class FifaTeams {
    private String[] teams = {"Argentina", "France", "England", "Belgium", "Brazil", "Netherlands", "Portugal", "Spain", "Italy", "Croatia", "Uruguay", "Morocco", "USA", "Colombia", "Mexico", "Germany", "Senegal", "Japan", "Switzerland", "Iran", "Denmark", "Korea Republic", "Australia", "Ukraine", "Austria", "Sweden", "Hungary", "Nigeria", "Wales", "Poland", "Ecuador", "Serbia"};

    public String[] getTeams() {
        return teams;
    }
}

class RandomGenerateGroups {
    private int size;
    private int groupSize;
    private List<List<Integer>> teamSets;
    private Set<Integer> st;

    public RandomGenerateGroups(int size, int groupSize) {
        this.size = size;
        this.groupSize = groupSize;
        this.teamSets = new ArrayList<>();
        this.st = new HashSet<>();
        for (int i = 0; i < size; i++) {
            st.add(i);
        }
    }

    public List<List<Integer>> generate() {
        int totalTeams = size / groupSize;
        for (int i = 0; i < totalTeams; i++) {
            List<Integer> temp = new ArrayList<>();
            // generate two numbers from 1 to 16
            while(true) {
                int number1 = generateRandomNumber(0, 15);
                if (!st.contains(number1)) {
                    continue;
                }
                int number2 = generateRandomNumber(0, 15);
                if (!st.contains(number2) || number1 == number2) {
                    continue;
                }
                temp.add(number1);
                temp.add(number2);
                st.remove(number1);
                st.remove(number2);
                break;
            }
            // generate two numbers from 17 to 32
            while(true) {
                int number1 = generateRandomNumber(16, 31);
                if (!st.contains(number1)) {
                    continue;
                }
                int number2 = generateRandomNumber(16, 31);
                if (!st.contains(number2) || number1 == number2) {
                    continue;
                }
                temp.add(number1);
                temp.add(number2);
                st.remove(number1);
                st.remove(number2);
                break;
            }
            teamSets.add(temp);
        }
        return teamSets;
    }

    public int generateRandomNumber(int mini, int maxi) {
        Random random = new Random();
        return random.nextInt(maxi - mini + 1) + mini;
    }
}

public class FifaCupMain {
    public static void main(String[] args) {
        FifaTeams fifaTeams = new FifaTeams();
        String[] teams = fifaTeams.getTeams();
        RandomGenerateGroups randomGenerateGroups = new RandomGenerateGroups(32, 4);
        List<List<Integer>> teamIndexes = randomGenerateGroups.generate();
        int count = 1;
        for (List<Integer> teamIndex : teamIndexes) {
            System.out.println("-------------------------------------------------");
            System.out.println("Team " + count++);
            System.out.println(
                    teams[teamIndex.get(0)] + " " +
                            teams[teamIndex.get(1)] + " " +
                            teams[teamIndex.get(2)] + " " +
                            teams[teamIndex.get(3)] + " "
            );
        }
    }
}
import java.util.*;
public class sudokudfs {
    int sum = 0;
    public void SudokuStart(int[][] board){
        SudokuSolve(board, 0);
    }
    private boolean SudokuSolve(int[][] board, int index){
        if(index == 81){
        sum += (100*board[0][0] + 10*board[0][1] + board[0][2]);
        return true;
      }
        
        
        int row = index / 9;
        int col = index % 9;
        
        if(board[row][col] != 0) return SudokuSolve(board, index+1);
        
        else
            for(int i = 1; i <= 9; i++){
                if(check(board, row, col, i)){
                    board[row][col] = i;                  
                 if(SudokuSolve(board, index+1)) return true;
                 board[row][col] = 0; 
                }   
            }
      
            
    return false;
    }



    public boolean check(int[][] board, int row, int col, int c) {        
        // check columns/rows
        for(int i = 0; i < 9; i++){
            if(board[row][i] == c) return false;
            if(board[i][col] == c) return false;
        }
        
        int Grow = row - row % 3; 
        int Gcol = col - col % 3;
        
        for(int m = 0; m < 3; m++){
            for(int k = 0; k < 3; k++){
                if(board[Grow + k][Gcol + m] == c) return false;
            }
        }
        
        return true;
    }

    
    
    
    public static void main(String[] args) {
        /* Enter your code here. Print output to STDOUT. Your class should be named Solution. */
        sudokudfs s = new Solution();
        Scanner in = new Scanner(new File("p096_sudoku.txt"));
	int[][] nboard = new int[9][9];
        for(int i = 0; i < 50; i++){
            in.nextLine();
            for(int j = 0; j < 9; j++){
            String s1 = in.nextLine();
            char[] n = s1.toCharArray();
            for(int k = 0; k < 9; k++){
                nboard[j][k] = n[k] - '0';
                }   
                }
            
            s.SudokuStart(nboard);
        }
        
        System.out.println(s.sum);
                       
        }
}

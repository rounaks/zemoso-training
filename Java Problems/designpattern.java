import java.io.*;
import java.util.*;


interface factory{
    public void login(String s);
}

public class designpattern implements factory {

    
    @Override
    public void login(String social_network_name) {
        
        switch(social_network_name)
        {
            case "Facebook":
                System.out.println("Logged in with Facebook");
                break;
            case "Google":
                System.out.println("Logged in with Google");
                break;
            case "LinkedIn":
                System.out.println("Logged in with LinkedIn");
                break;
            case "Twitter":
                System.out.println("Logged in with Twitter");
                break;
            default:
                System.out.println("Invalid Option");
    
        }
    }
    
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        Solution sol = new Solution();
        
        System.out.println("Do you want to continue with Social Network login? y/n");
            String x = in.nextLine();
        char c = x.charAt(0);
        if(c=='y')
            System.out.println("Enter: Facebook/Google/LinkedIn/Twitter ?");
        else
            System.out.println("Come back later");
        String S = in.nextLine();
        sol.login(S);
        
        
        
    }
    
}



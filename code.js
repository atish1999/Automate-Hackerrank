module.exports = {
    answers: [`
    #include "bits/stdc++.h"
    using namespace std;
    
    int simpleArraySum(vector<int> &ar)
    {
        int sum = 0;
        for(auto e : ar)
            sum += e;
        return sum;
    }
    
    int main()
    {
        int n;
        cin >> n;
    
        vector<int> v(n, 0);
    
        for(auto &i : v)
            cin >> i;
    
        int result = simpleArraySum(v);
    
        cout << result << endl;
    }
    `]
};
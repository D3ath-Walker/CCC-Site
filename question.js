const questions = {
  easy: [

`#include<stdio.h>

int main()
{
    int a = 10
    printf("%d", a);
    return 0;
}`,

`#include<stdio.h>

int main()
{
    int i;
    for(i=0;i<5 i++)
    {
        printf("%d", i);
    }
}`

],

  medium: [

`#include<stdio.h>

int main()
{
    int a = 5;
    printf("%d" a);
}`

],

  hard: [

`#include<stdio.h>

int main()
{
    int a = 10;
    if(a=5)
    {
        printf("equal");
    }
}`

]

};

module.exports = questions;